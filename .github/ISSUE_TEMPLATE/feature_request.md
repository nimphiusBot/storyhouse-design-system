---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## Is your feature request related to a problem?
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

## Describe the Solution
A clear and concise description of what you want to happen.

## Describe Alternatives
A clear and concise description of any alternative solutions or features you've considered.

## Component Impact
- [ ] New component needed
- [ ] Changes to existing component
- [ ] New tokens/variables needed

## Additional Context
Add any other context or screenshots about the feature request here.
FEATUREEOF

cat > .github/PULL_REQUEST_TEMPLATE.md << 'PREOF'
## Description
<!-- Brief description of what this PR includes -->

## Type of Change
- [ ] Bug fix
- [ ] New component
- [ ] Component improvement
- [ ] Documentation update
- [ ] Token/system change

## Testing
- [ ] Unit tests added/updated
- [ ] Storybook stories added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested

## Checklist
- [ ] Component follows design system conventions
- [ ] Theme tokens used (no hardcoded values)
- [ ] TypeScript types are correct
- [ ] No new warnings generated
- [ ] Tests pass locally

## Screenshots
<!-- If UI changes, add screenshots -->
PREOF

echo "Files created"

# git add and commit
git add CONTRIBUTING.md .github/ISSUE_TEMPLATE/ .github/PULL_REQUEST_TEMPLATE.md
git commit -m "[DOC] Add CONTRIBUTING.md, issue/PR templates (ORA-246)"
git push origin main 2>&1 | tail -5