#!/bin/bash
set -e

echo "Fixing package-lock.json..."

# Install eslint and eslint-config-next explicitly
npm install eslint@^8.56.0 eslint-config-next@15.2.4 --save-dev

# Remove the old package-lock.json
rm -f package-lock.json

# Regenerate package-lock.json
npm install --package-lock-only

echo "Package-lock.json has been fixed. Now committing changes..."

# Add changes to git
git add package-lock.json package.json
git commit -m "chore: update package-lock.json to fix CI issues"
git push origin develop

echo "Changes pushed to develop branch." 