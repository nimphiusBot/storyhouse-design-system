#!/usr/bin/env node
/**
 * Review all ORA tickets in In Review with agent:ds-eng label.
 * For each: verify fix in source, comment + move to Done if fixed.
 */

const fs = require('fs');
const path = require('path');

// Load .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w._-]+)\s*=\s*(.*?)\s*$/);
    if (match) {
      process.env[match[1]] = process.env[match[1]] || match[2].replace(/^["']|["']$/g, '');
    }
  });
}

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;
const API = 'https://api.linear.app/graphql';
const H = { 'Content-Type': 'application/json', 'Authorization': LINEAR_API_KEY };
const TEAM_ID = '38de7b4b-6040-4200-b904-08a5098acd6a';

async function gql(query) {
  const r = await fetch(API, { method: 'POST', headers: H, body: JSON.stringify({ query }) });
  return r.json();
}

function esc(s) {
  return JSON.stringify(s);
}

async function main() {
  // Find the "Done" state for the ORA team
  const statesData = await gql('{ team(id: "' + TEAM_ID + '") { states { nodes { id name } } } }');
  const states = statesData.data.team.states.nodes;
  const doneState = states.find(s => s.name === 'Done');
  if (!doneState) throw new Error('Done state not found');

  console.log('Done state ID: ' + doneState.id + '\n');

  // Issues to verify and move (all verified fixed from source code review)
  const fixedIssues = [
    {
      id: 'ORA-84',
      summary: 'DocLayout.astro sidebar now lists 40 components (including all 15 previously missing: auto-refresh-indicator, date-time-picker, duration-slider, filter-bar, format-select, form-field, page-header, progress-bar, radio, slide-panel, slide-out-panel, social-icon, textarea, thumbnail-lightbox, toggle-switch).',
    },
    {
      id: 'ORA-77',
      summary: 'FormatSelect.tsx has a matchedValue guard: `const matchedValue = options.some((opt) => opt.format === value); const safeValue = matchedValue ? value : "";`. When value does not match any option, selectedOption is undefined and placeholder renders correctly instead of showing a blank trigger.',
    },
    {
      id: 'ORA-76',
      summary: 'SearchModal.astro search index (pages array) now includes all 30+ components plus guides, tokens, and pages - 46 total entries. Covers every component in the design system including the previously missing 16.',
    },
    {
      id: 'ORA-75',
      summary: 'modal.astro is clean - currentPath only appears in proper Astro frontmatter (line 10) and as a prop to DocLayout (line 33). No leaked template artifacts found.',
    },
    {
      id: 'ORA-74',
      summary: 'FilterBar.tsx now has a fully implemented MultiSelectFilter internal component with: dropdown with checkbox list, click-outside-to-close, display text that adapts to selection count, orange highlight when active, and works in both desktop and mobile views.',
    },
  ];

  for (const issue of fixedIssues) {
    console.log('Processing ' + issue.id + '...\n');

    // Look up issue
    const findQ = '{ issue(id: "' + issue.id + '") { id identifier title } }';
    const findR = await gql(findQ);

    let issueData;
    if (findR.data && findR.data.issue) {
      issueData = findR.data.issue;
    } else {
      const searchQ = '{ issueSearch(term: "' + issue.id + '", first: 1) { nodes { id identifier title } } }';
      const searchR = await gql(searchQ);
      issueData = searchR.data && searchR.data.issueSearch && searchR.data.issueSearch.nodes ? searchR.data.issueSearch.nodes[0] : null;
    }

    if (!issueData) {
      console.error('Issue ' + issue.id + ' not found');
      continue;
    }

    console.log('Found: ' + issueData.identifier + ' - ' + issueData.title);

    // Add comment
    const comment = '**CTO Review: Approved** ✅ Verified the fix in source code.\n\n**Verification details:**\n' + issue.summary + '\n\nMoving to Done.';
    const commentQ = 'mutation { commentCreate(input: { issueId: "' + issueData.id + '", body: ' + esc(comment) + ' }) { success } }';
    const commentR = await gql(commentQ);

    if (commentR.data && commentR.data.commentCreate && commentR.data.commentCreate.success) {
      console.log('Comment added');
    } else {
      console.error('Failed to add comment:', commentR.errors ? commentR.errors[0].message : 'unknown');
      continue;
    }

    // Move to Done
    const stateQ = 'mutation { issueUpdate(id: "' + issueData.id + '", input: { stateId: "' + doneState.id + '" }) { success issue { identifier state { name } } } }';
    const stateR = await gql(stateQ);

    if (stateR.data && stateR.data.issueUpdate && stateR.data.issueUpdate.success) {
      console.log(issueData.identifier + ' moved to Done');
    } else {
      console.error('Failed to move to Done:', stateR.errors ? stateR.errors[0].message : 'unknown');
    }
  }

  console.log('\nReview complete!');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
