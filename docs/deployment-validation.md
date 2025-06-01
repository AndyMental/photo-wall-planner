# GitHub Actions Deployment Workflow Validation

*Last updated: June 5, 2024*

This document validates the GitHub Actions workflow setup for the Photo Wall Planner project, confirming proper configuration for both development and production environments.

## Current Setup

### Environment Variables

The following GitHub Secrets are properly configured and used by both deployment workflows:

- `VERCEL_TOKEN`: Authentication token for Vercel API
- `VERCEL_ORG_ID`: The organization ID for your Vercel account
- `VERCEL_PROJECT_ID`: The project ID for your Photo Wall Planner project

### Development Workflow (`.github/workflows/dev-deployment.yml`)

Triggered on:
- Push to `develop` branch
- Push to any `feature/*` branch
- Manual trigger (workflow_dispatch)

Consists of three jobs:
1. **Run Tests**: Executes linting, type checking, tests, and build
2. **Deploy to Development**: Deploys to Vercel preview environment and runs smoke test
3. **End-to-End Tests**: Runs Playwright tests against the deployed preview (only on `develop` branch)

### Production Workflow (`.github/workflows/vercel-deploy.yml`)

Triggered on:
- Push to `main` branch
- Push to `develop` branch
- Pull requests to `main` branch

Consists of two jobs:
1. **Deploy to Vercel**: Builds and deploys to Vercel (production for `main`, preview for others)
2. **Lighthouse**: Runs Lighthouse audit (only for pull requests)

## Validation Process

1. Code pushed to a feature branch will trigger the development workflow
2. Code merged to `develop` will trigger both workflows
3. Pull request to `main` will trigger the production workflow in preview mode
4. Code merged to `main` will trigger the production workflow in production mode

## Testing Requirements

- Basic unit tests via Jest (dummy test exists as a placeholder)
- E2E tests via Playwright (actual implementation exists)
- Smoke test via curl against deployed preview URL

## Validation Status

✅ **Verified**: The GitHub Actions workflow is correctly configured with proper environment variables and deployment triggers for both development and production environments.

## Validation Testing

During validation, we performed the following tests:

1. **Test Script Validation**: Confirmed that `npm run test` executes successfully with the dummy test placeholder.
2. **Playwright Test Configuration**: Validated that Playwright tests are correctly configured and recognized by the test runner.
3. **Test File Structure**: Confirmed the existence of both a dummy test file and an actual E2E test suite in `basic-flow.spec.ts`.
4. **Workflow Configuration**: Verified both workflow files have the correct triggers, jobs, and environment variable references.

## Notes

- Both workflows are using Node.js 18
- The production workflow comments on PRs with the deployment URL
- Lighthouse audits are automatically run for PRs to main
- E2E tests are only run on the `develop` branch
- The Playwright configuration supports multiple browser environments: Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari 