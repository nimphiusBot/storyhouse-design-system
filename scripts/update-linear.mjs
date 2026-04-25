#!/usr/bin/env node
const key = process.env.LINEAR_API_KEY;
if (!key) { console.error('❌ LINEAR_API_KEY not set'); process.exit(1); }

const args = process.argv.slice(2);
const issueId = args[0];
const stateName = args[1] || '';
const comment = args.slice(2).join(' ');
if (!issueId) { console.error('Usage: node update-linear.mjs <issueId> [stateName] [comment...]'); process.exit(1); }

const graphql = async (query) => {
  const r = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {'Content-Type':'application/json', Authorization: key},
    body: JSON.stringify({ query })
  });
  return r.json();
};

// Find issue
let data = await graphql(`{ issues(first:30) { nodes { id identifier title state { id name } team { id } } } }`);
const issue = data.data.issues.nodes.find(n => n.identifier === issueId);
if (!issue) {
  // Try searching
  data = await graphql(`{ issueSearch(term: "${issueId}") { nodes { id identifier title state { id name } team { id } } } }`);
  const issue = data.data?.issueSearch?.nodes?.[0];
  if (!issue) { console.error('Issue not found:', issueId); process.exit(1); }
}
console.log(`Found: ${issue.identifier} (state: ${issue.state.name})`);

// Add comment
if (comment) {
  const res = await graphql(`mutation { commentCreate(input: { issueId: "${issue.id}", body: ${JSON.stringify(comment)} }) { success } }`);
  if (res.data?.commentCreate?.success) console.log('✅ Comment added');
  else console.error('❌ Comment failed:', JSON.stringify(res.errors));
}

// Transition state
if (stateName) {
  data = await graphql(`{ workflowStates(first:50) { nodes { id name team { id } } } }`);
  const match = data.data.workflowStates.nodes.find(s => s.name === stateName && s.team?.id === issue.team.id);
  if (!match) { console.error(`❌ State "${stateName}" not found`); process.exit(1); }
  const res = await graphql(`mutation { issueUpdate(id: "${issue.id}", input: { stateId: "${match.id}" }) { success issue { identifier state { name } } } }`);
  if (res.data?.issueUpdate?.success) console.log(`✅ Transitioned to "${stateName}"`);
  else console.error('❌ Transition failed:', JSON.stringify(res.errors));
}

console.log('✨ Done');