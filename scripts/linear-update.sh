#!/bin/bash
# Linear update helper
ISSUE="$1"
STATE="$2"
COMMENT="$3"

source /Users/openclaw/projects/storyhouse-design-system/.env
export LINEAR_API_KEY

if [ -n "$STATE" ]; then
  echo "=== Updating ORA-${ISSUE} to state: $STATE ==="
  # Find issue ID first
  RESP=$(curl -s -X POST https://api.linear.app/graphql \
    -H "Content-Type: application/json" \
    -H "Authorization: $LINEAR_API_KEY" \
    -d "{\"query\":\"{ issueSearch(term: \\\"ORA-${ISSUE}\\\", first: 1) { nodes { id identifier title } } }\"}")
  echo "$RESP"
  ISSUE_ID=$(echo "$RESP" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);const n=j.data?.issueSearch?.nodes?.[0];if(n)console.log(n.id);else process.exit(1)}catch(e){process.exit(1)}})")
  if [ -n "$ISSUE_ID" ]; then
    echo "Issue ID: $ISSUE_ID"
    # Get the In Review state ID
    STATES_RESP=$(curl -s -X POST https://api.linear.app/graphql \
      -H "Content-Type: application/json" \
      -H "Authorization: $LINEAR_API_KEY" \
      -d '{"query":"{ workflowStates(first: 50) { nodes { id name team { id } } } }"}')
    IN_REVIEW_ID=$(echo "$STATES_RESP" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);const s=j.data?.workflowStates?.nodes?.find(n=>n.name==='In Review');if(s)console.log(s.id);else process.exit(1)}catch(e){process.exit(1)}})")
    
    if [ -n "$IN_REVIEW_ID" ]; then
      echo "In Review state ID: $IN_REVIEW_ID"
      curl -s -X POST https://api.linear.app/graphql \
        -H "Content-Type: application/json" \
        -H "Authorization: $LINEAR_API_KEY" \
        -d "{\"query\":\"mutation{issueUpdate(id:\\\"${ISSUE_ID}\\\",input:{stateId:\\\"${IN_REVIEW_ID}\\\"}){success}}\"}"
      echo ""
    fi
  fi
fi

if [ -n "$COMMENT" ]; then
  echo "=== Adding comment to ORA-${ISSUE} ==="
  RESP=$(curl -s -X POST https://api.linear.app/graphql \
    -H "Content-Type: application/json" \
    -H "Authorization: $LINEAR_API_KEY" \
    -d "{\"query\":\"{ issueSearch(term: \\\"ORA-${ISSUE}\\\", first: 1) { nodes { id } } }\"}")
  ISSUE_ID=$(echo "$RESP" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);const n=j.data?.issueSearch?.nodes?.[0];if(n)console.log(n.id);else process.exit(1)}catch(e){process.exit(1)}})")
  if [ -n "$ISSUE_ID" ]; then
    curl -s -X POST https://api.linear.app/graphql \
      -H "Content-Type: application/json" \
      -H "Authorization: $LINEAR_API_KEY" \
      -d "{\"query\":\"mutation{commentCreate(input:{issueId:\\\"${ISSUE_ID}\\\",body:\\\"${COMMENT}\\\"}){success}}\"}"
    echo ""
  fi
fi
