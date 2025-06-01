# Deployment Setup Guide

*Last updated: June 5, 2024*

This guide provides instructions for setting up the GitHub Actions workflow for automated deployments to Vercel for both development and production environments.

## Prerequisites

Before setting up GitHub Actions for Vercel deployments, you need:

1. A Vercel account
2. A project created in Vercel
3. Admin access to the GitHub repository

## Required Secrets

The following GitHub secrets must be configured in your repository settings:

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | API token for authenticating with Vercel | Generate from Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel organization/team ID | Found in Vercel Dashboard → Settings → General → Your ID |
| `VERCEL_PROJECT_ID` | The ID of your Vercel project | Found in Project Settings → General → Project ID |

## Setup Steps

1. **Get Vercel API Token**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Tokens
   - Create a new token with an appropriate name (e.g., "GitHub Actions Deploy")
   - Copy the token value immediately (it won't be shown again)

2. **Get Vercel Organization ID**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → General
   - Copy the value under "Your ID"

3. **Get Vercel Project ID**
   - Go to your project in Vercel Dashboard
   - Navigate to Project Settings → General
   - Copy the value under "Project ID"

4. **Add Secrets to GitHub Repository**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add the following repository secrets:
     - Name: `VERCEL_TOKEN`, Value: [Your Vercel API token]
     - Name: `VERCEL_ORG_ID`, Value: [Your Vercel organization ID]
     - Name: `VERCEL_PROJECT_ID`, Value: [Your Vercel project ID]

5. **Verify GitHub Workflow Files**
   - Ensure `.github/workflows/dev-deployment.yml` and `.github/workflows/vercel-deploy.yml` exist in your repository
   - Verify that both files reference the secrets properly with `${{ secrets.SECRET_NAME }}`
   - Commit and push the workflow files if not already present

## Workflow Customization

### Development Workflow

The development workflow (`dev-deployment.yml`) is triggered on pushes to `develop` and `feature/*` branches. It runs tests, builds the project, and deploys to a Vercel preview environment.

To customize:
- Modify the trigger branches in the `on.push.branches` section
- Adjust the Node.js version if needed
- Add or remove test steps based on your project's requirements

### Production Workflow

The production workflow (`vercel-deploy.yml`) is triggered on pushes to `main` branch and pull requests to `main`. It deploys to Vercel production for `main` branch or preview for other branches.

To customize:
- Modify the trigger branches in the `on.push.branches` section
- Adjust the Node.js version if needed
- Customize the PR comment format
- Modify Lighthouse audit configurations in `.lighthouserc.json`

## Monitoring Deployments

- View workflow runs in the "Actions" tab of your GitHub repository
- Check deployment statuses in the Vercel Dashboard
- For PR deployments, preview links are automatically added as comments
- Lighthouse audit results are available in the workflow run details

## Troubleshooting

If deployments fail, check:
1. GitHub secrets are correctly configured
2. Workflow files are properly formatted
3. Repository permissions are set correctly
4. Vercel project settings (especially environment variables)
5. Build errors in the workflow run logs

## Notes

- Production deployments (`main` branch) require special care as they affect live users
- Consider adding approval gates for production deployments
- Set up branch protection rules for the `main` branch
- Regularly review and update GitHub secrets (rotate tokens)

---

For more information, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Deployment Validation Report](./deployment-validation.md) 