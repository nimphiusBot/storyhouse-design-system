#!/usr/bin/env node
/**
 * update-linear.js — Utility script for agents to update Linear issues
 *
 * Usage:
 *   node /workspace/.openclaw/update-linear.js --issue ORA-6 --state "In Review" --comment "Completed: set up design system tokens"
 *   node /workspace/.openclaw/update-linear.js --issue ORA-6 --comment "Pushed PR for review"
 *   node /workspace/.openclaw/update-linear.js --issue ORA-6 --state "Done" --comment "Issue completed"
 *
 * Requires LINEAR_API_KEY in environment or .env file.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load .env if present
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
const LINEAR_API_URL = 'https://api.linear.app/graphql';

if (!LINEAR_API_KEY) {
  console.error('❌ ERROR: LINEAR_API_KEY not found in environment or .env file');
  console.error('   Add LINEAR_API_KEY=lin_api_xxx to your .env file');
  process.exit(1);
}

// Parse CLI args
const args = {};
process.argv.slice(2).forEach((arg, i) => {
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const val = process.argv[i + 3] && !process.argv[i + 3].startsWith('--') ? process.argv[i + 3] : true;
    args[key] = process.argv[i + 3] && !process.argv[i + 3].startsWith('--') ? process.argv[i + 3] : true;
  }
});

const issueIdentifier = args.issue || args.i;
const targetState = args.state || args.s;
const comment = args.comment || args.c;

if (!issueIdentifier) {
  console.error('❌ ERROR: --issue (issue identifier) is required');
  console.error('   Usage: node update-linear.js --issue ORA-6 --state "In Review" --comment "Done"');
  process.exit(1);
}

if (!targetState && !comment) {
  console.error('❌ ERROR: At least one of --state or --comment is required');
  process.exit(1);
}

const H = { 'Content-Type': 'application/json', 'Authorization': LINEAR_API_KEY };

async function main() {
  // Step 1: Find the issue by identifier
  console.log(`🔍 Looking up issue ${issueIdentifier}...`);
  
  let resp = await fetch(LINEAR_API_URL, {
    method: 'POST',
    headers: H,
    body: JSON.stringify({
      query: `{ issue(id: "${issueIdentifier}") { id identifier title team { id key } state { id name } } }`
    })
  });
  let data = await resp.json();
  
  // If not found by ID, try by identifier
  if (data.errors) {
    resp = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({
        query: `{ issueSearch(term: "${issueIdentifier}", first: 1) { nodes { id identifier title team { id key } state { id name } } } }`
      })
    });
    data = await resp.json();
  }

  const issue = data.data?.issue || data.data?.issueSearch?.nodes?.[0];
  
  if (!issue) {
    console.error(`❌ ERROR: Issue "${issueIdentifier}" not found in Linear`);
    process.exit(1);
  }

  console.log(`📋 Found: ${issue.identifier} - ${issue.title}`);
  console.log(`   Current state: ${issue.state?.name || 'Unknown'}`);
  console.log(`   Team: ${issue.team?.key || 'Unknown'}`);

  // Step 2: Add comment if provided
  if (comment) {
    console.log(`💬 Adding comment...`);
    resp = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({
        query: `mutation { commentCreate(input: { issueId: "${issue.id}", body: ${JSON.stringify(comment)} }) { success } }`
      })
    });
    data = await resp.json();
    
    if (data.errors || !data.data?.commentCreate?.success) {
      console.error(`❌ Failed to add comment:`, data.errors?.[0]?.message || 'Unknown error');
      process.exit(1);
    }
    console.log(`✅ Comment added`);
  }

  // Step 3: Transition state if provided
  if (targetState) {
    console.log(`🔄 Transitioning to "${targetState}"...`);
    
    // Find the state ID
    resp = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({
        query: `{ workflowStates(first: 50) { nodes { id name team { id } } } }`
      })
    });
    data = await resp.json();
    
    const states = data.data?.workflowStates?.nodes || [];
    const teamId = issue.team?.id;
    const match = states.find((s) => s.name === targetState && s.team?.id === teamId);
    
    if (!match) {
      console.error(`❌ State "${targetState}" not found for team ${issue.team?.key}`);
      process.exit(1);
    }

    resp = await fetch(LINEAR_API_URL, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({
        query: `mutation { issueUpdate(id: "${issue.id}", input: { stateId: "${match.id}" }) { success issue { identifier state { name } } } }`
      })
    });
    data = await resp.json();

    if (data.errors || !data.data?.issueUpdate?.success) {
      console.error(`❌ Failed to transition state:`, data.errors?.[0]?.message || 'Unknown error');
      process.exit(1);
    }
    console.log(`✅ Issue ${issue.identifier} transitioned to "${targetState}"`);
  }

  console.log(`\n✨ Done! ${issue.identifier} updated successfully.`);
}

main().catch(err => {
  console.error('❌ Unexpected error:', err.message);
  process.exit(1);
});
