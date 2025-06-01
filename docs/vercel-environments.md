# Vercel Environments Setup

*Last updated: June 5, 2024*

This document explains the Vercel environments configuration for the Photo Wall Planner project.

## Environment Types

The project uses three types of Vercel environments:

1. **Production Environment**
   - Used for live production deployments
   - Deployed from the `main` branch
   - Configured with production environment variables
   - Accessed via the main project URL

2. **Development Environment**
   - Used for team development and testing
   - Deployed from the `develop` branch
   - Configured with development-specific environment variables
   - Allows testing of features before they're ready for production

3. **Preview Environment**
   - Used for pull request previews
   - Automatically created for each pull request targeting `main`
   - Configured with preview-specific environment variables
   - Temporary deployments for reviewing changes

## GitHub Actions Integration

Our GitHub Actions workflows use these environments as follows:

### Production Deployment Workflow (`.github/workflows/prod-deployment.yml`)

- Triggered on pushes to `main` branch and PRs targeting `main`
- Uses Vercel's production environment for `main` branch deployments
- Uses Vercel's preview environment for PR deployments
- PR comments include the preview URL for easy access

### Development Deployment Workflow (`.github/workflows/dev-deployment.yml`)

- Triggered on pushes to `develop` branch and feature branches
- Uses Vercel's development environment
- Includes E2E tests specific to the development environment

## Environment Variables

Each environment can have its own set of environment variables. These are configured in the Vercel dashboard:

1. Go to your Vercel project
2. Navigate to Settings > Environment Variables
3. Add variables to the appropriate environment (Production, Preview, Development)

## Local Development

For local development with environment variables:

```bash
# Pull environment variables from Vercel
npm run vercel:pull

# Start development server with Vercel environment
npm run vercel:dev
```

This ensures consistent environment variables across local and deployed instances.

## Environment Configuration in GitHub

The GitHub Actions workflows use the following secrets:

- `VERCEL_TOKEN`: API token for authenticating with Vercel
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: The project ID for the Photo Wall Planner project

These must be configured in your GitHub repository settings under Secrets and Variables > Actions. 