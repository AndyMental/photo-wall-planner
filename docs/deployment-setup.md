# Deployment Setup Guide

## 🚀 GitHub Actions + Vercel Deployment

This project uses GitHub Actions for automated CI/CD with Vercel deployments.

### Required GitHub Secrets

You need to add these secrets to your GitHub repository:

#### 1. Go to Repository Settings
- Navigate to your GitHub repository
- Go to **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**

#### 2. Add Required Secrets

```bash
# Vercel Authentication Token
VERCEL_TOKEN=b8dSiQk2tziU7njlMbAEAoln

# Vercel Organization ID (Team ID)
VERCEL_ORG_ID=team_eKdasPGx5AtvcEG6lUar1NAO

# Vercel Project ID
VERCEL_PROJECT_ID=prj_xVAphagKgur02Wcec56mgkBKzAW9
```

### 📋 How to Get These Values

#### Getting VERCEL_TOKEN
- Already configured in your MCP setup: `b8dSiQk2tziU7njlMbAEAoln`

#### Getting VERCEL_ORG_ID
- Run: `vercel teams ls` or check the team slug from project details
- Current value: `team_eKdasPGx5AtvcEG6lUar1NAO`

#### Getting VERCEL_PROJECT_ID  
- Run: `vercel project inspect` in your project directory
- Current value: `prj_xVAphagKgur02Wcec56mgkBKzAW9`

## 🔄 Deployment Workflows

### 1. Production Deployment (`main` branch)
**Trigger:** Push to `main` branch
```yaml
✅ Install dependencies
✅ Run tests (if available)
✅ Build project
✅ Deploy to Vercel production
✅ Update production URL
```

### 2. Development Deployment (`develop` branch)
**Trigger:** Push to `develop` or `feature/*` branches
```yaml
✅ Run tests and linting
✅ Type checking
✅ Build validation
✅ Deploy to Vercel preview
✅ Run smoke tests
✅ E2E tests (on develop)
```

### 3. Pull Request Previews
**Trigger:** Pull requests to `main`
```yaml
✅ Deploy preview environment
✅ Comment PR with preview URL
✅ Run Lighthouse audit
✅ Performance/accessibility checks
```

## 🌐 Environment URLs

### Production
- **Primary URL**: `https://photo-wall-planner.vercel.app`
- **Team URL**: `https://photo-wall-planner-andymentals-projects.vercel.app`

### Development/Preview
- **Preview URLs**: Generated dynamically per deployment
- **Branch URLs**: `https://photo-wall-planner-git-{branch}-andymentals-projects.vercel.app`

## 🛠️ Local Development Commands

```bash
# Start development server
npm run dev

# Pull Vercel environment variables
npm run vercel:pull

# Run local Vercel dev server  
npm run vercel:dev

# Type checking
npm run type-check

# Run E2E tests
npm run test:e2e

# Deploy preview manually
npm run deploy:preview

# Deploy to production manually
npm run deploy:prod
```

## 🔧 Environment Variables

### Local Development
Create `.env.local` file:
```bash
# Pull from Vercel
npm run vercel:pull
```

### Production/Preview
Environment variables are managed through:
1. **Vercel Dashboard**: For app-specific variables
2. **GitHub Secrets**: For deployment tokens
3. **Vercel CLI**: For environment synchronization

## 📊 Quality Checks

### Lighthouse Audits
Automatically run on PR deployments:
- **Performance**: Min 80%
- **Accessibility**: Min 90% (error on fail)
- **Best Practices**: Min 80%
- **SEO**: Min 80%

### Testing Pipeline
- **Unit Tests**: `npm run test` (if present)
- **Type Checking**: `npm run type-check`
- **Linting**: `npm run lint`
- **E2E Tests**: `npm run test:e2e` (on develop)

## 🚨 Troubleshooting

### Common Issues

1. **Deployment Fails with npm install**
   - ✅ Fixed with `.npmrc` configuration
   - Uses `legacy-peer-deps=true`

2. **Missing Environment Variables**
   - Check GitHub Secrets are properly set
   - Verify Vercel project connection

3. **Build Failures**
   - Check Node.js version compatibility (18.x)
   - Verify TypeScript compilation

4. **Preview URL Not Working**
   - Wait for deployment to complete (~1-2 minutes)
   - Check GitHub Actions logs for errors

## 📈 Monitoring

- **Deployment Status**: GitHub Actions tab
- **Performance**: Vercel Analytics dashboard
- **Errors**: Vercel Runtime logs
- **Security**: GitHub Security alerts

## 🔄 Branch Strategy

```
main (production)
├── develop (staging/preview)
│   ├── feature/new-feature
│   └── feature/bug-fix
└── hotfix/urgent-fix
```

### Recommended Workflow
1. **Feature Development**: Create `feature/*` branch from `develop`
2. **Testing**: Push to `develop` for preview deployment
3. **Production**: Merge `develop` → `main` for production deployment
4. **Hotfixes**: Create `hotfix/*` branch from `main`, merge back to both `main` and `develop` 