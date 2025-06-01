# GitHub Actions Workflows

This document explains the GitHub Actions workflows used in this project for continuous deployment.

## Overview

We use two simple workflows for deployment:

1. **Development Deployment**: Deploys changes from the `develop` branch to a development environment on Vercel.
2. **Production Deployment**: Deploys changes from the `main` branch to the production environment on Vercel.

## Development Deployment

The development workflow (`dev-deployment.yml`) is triggered on:
- Pushes to the `develop` branch
- Pushes to any `feature/*` branches
- Manual triggers via GitHub UI

It performs the following steps:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Installs Vercel CLI
5. Pulls Vercel environment configuration for the development environment
6. Builds the project
7. Deploys to Vercel's development environment

## Production Deployment

The production workflow (`prod-deployment.yml`) is triggered on:
- Pushes to the `main` branch
- Pull requests targeting the `main` branch

It performs the following steps:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Installs Vercel CLI
5. Pulls Vercel environment configuration (production for main branch, preview for PRs)
6. Builds the project
7. Deploys to Vercel (production for main branch, preview for PRs)
8. For pull requests, it also adds a comment with the preview URL

## Vercel Environments

We use three Vercel environments:

1. **Production**: The live site, deployed from the `main` branch
2. **Preview**: Temporary deployments for pull requests targeting `main`
3. **Development**: Development environment deployed from the `develop` branch

## Environment Variables

The workflows require the following secrets to be set in the GitHub repository:

- `VERCEL_TOKEN`: A Vercel API token
- `VERCEL_ORG_ID`: The Vercel organization ID
- `VERCEL_PROJECT_ID`: The Vercel project ID

For more information on Vercel environments, see [docs/vercel-environments.md](vercel-environments.md). 