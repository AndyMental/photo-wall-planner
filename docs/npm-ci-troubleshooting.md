# NPM CI Troubleshooting Guide

## Common Issue: Package-lock.json Out of Sync

One common issue when running GitHub Actions with Node.js projects is when `npm ci` fails with an error message similar to:

```
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
```

This happens because the package-lock.json file is not properly in sync with package.json.

## Why This Happens

1. **Different npm versions** - Using different npm versions locally vs. in GitHub Actions
2. **Environment differences** - Windows vs. Linux handling package resolution differently
3. **Legacy peer dependencies** - Configuration differences for handling peer dependencies
4. **Incomplete package updates** - Adding packages without updating the lock file properly

## How to Fix It

### Local Fix

If you encounter this issue locally, you can fix it by:

1. Removing the package-lock.json file: `rm package-lock.json`
2. Running npm install to generate a fresh one: `npm install`
3. Sometimes you may need to run npm install twice: `npm install && npm install`
4. Commit the new package-lock.json file

### Workflow Fix

We've implemented two key approaches in our GitHub Actions workflows:

1. **Using npm install instead of npm ci**: 
   - In our workflows, we use `npm install` which is more forgiving than `npm ci`
   - We explicitly install ESLint dependencies to ensure they're properly synced

2. **Double install when needed**:
   - If needed, running `npm install` twice can resolve tricky synchronization issues
   - The first run gets most dependencies, the second run fixes any remaining issues

## Preventative Measures

To prevent this issue from occurring:

1. **Standardize npm versions**: Use the same npm version locally and in CI
2. **Update lock file with every package.json change**: Always run `npm install` after modifying package.json
3. **Commit both files together**: Never commit package.json without also committing the updated package-lock.json
4. **Consider using --package-lock-only**: For updates without affecting node_modules: `npm install --package-lock-only`

## Troubleshooting Script

We've created a script (`fix-package-lock.sh`) in the root of the project that can fix package-lock issues:

```bash
./fix-package-lock.sh
```

This script:
1. Installs ESLint dependencies explicitly
2. Removes the old package-lock.json
3. Generates a fresh one
4. Commits and pushes the changes

## Future GitHub Actions Considerations

When setting up new GitHub Actions workflows:

1. Use `npm install` rather than `npm ci` when stability is more important than perfect reproducibility
2. Consider adding caching to speed up npm installations
3. Always include proper error handling for npm commands
4. Consider adding explicit checks for package-lock.json synchronization 