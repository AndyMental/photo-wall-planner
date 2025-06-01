# Photo Wall Planner (Wall Story)

A sophisticated web application for creating and visualizing photo wall layouts using AR technology.

## 🚀 Live Deployments

### Production
- **Main URL**: [https://photo-wall-planner.vercel.app](https://photo-wall-planner.vercel.app)
- **Team URL**: [https://photo-wall-planner-andymentals-projects.vercel.app](https://photo-wall-planner-andymentals-projects.vercel.app)

### Development
- **Branch Previews**: Automatically deployed on push to `develop` or `feature/*` branches
- **PR Previews**: Generated for all pull requests with preview URLs in comments

## ✨ Features

### Current Implementation
- ✅ **Next.js 15** with App Router and TypeScript
- ✅ **Tailwind CSS** for responsive design
- ✅ **5-Step Project Creation Flow**:
  1. **Frame Inventory** - Manage frame types and quantities
  2. **Layout Generator** - Choose from template layouts
  3. **Photo Selection** - Browse and select photos with filters
  4. **AR Visualization** - Wall detection and placement preview
  5. **Project Details** - Finalize project information and costs

### Pending Implementation
- 🔄 **Backend Integration**: Supabase setup for data persistence
- 🔄 **Authentication**: User registration and login
- 🔄 **Missing Pages**: `/projects`, `/layouts`, `/photos`, `/signup`
- 🔄 **API Integration**: Photo upload, frame management, project saving

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (planned)
- **Deployment**: Vercel with GitHub Actions
- **Testing**: Playwright E2E tests
- **Quality**: Lighthouse auditing, ESLint, TypeScript

## 🚀 Development Setup

```bash
# Clone repository
git clone https://github.com/AndyMental/photo-wall-planner.git
cd photo-wall-planner

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Run tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Deployment

### Automatic Deployments
- **Production**: Push to `main` branch
- **Preview**: Push to `develop` or `feature/*` branches
- **PR Previews**: Automatic deployment for pull requests

### GitHub Actions Workflows
- **Development Workflow** (`.github/workflows/dev-deployment.yml`):
  - Triggers on pushes to `develop` and `feature/*` branches
  - Runs tests, linting, and type checking
  - Deploys to Vercel preview environment
  - Performs smoke tests on deployed preview
  - Runs E2E tests against deployed preview (only on `develop` branch)

- **Production Workflow** (`.github/workflows/vercel-deploy.yml`):
  - Triggers on pushes to `main` branch, PR to `main`, and pushes to `develop`
  - Builds and deploys to Vercel (production for `main`, preview for others)
  - Comments on PRs with deployment URLs
  - Runs Lighthouse audits on PR deployments

### Manual Deployment
```bash
# Deploy preview
npm run deploy:preview

# Deploy production
npm run deploy:prod
```

### Environment Setup
See [Deployment Setup Guide](./docs/deployment-setup.md) for complete GitHub Actions + Vercel configuration.
For detailed workflow validation see [Deployment Validation](./docs/deployment-validation.md).

## 🧪 Testing

### E2E Testing with Playwright
```bash
# Run all tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug
```

### Quality Assurance
- **Lighthouse Audits**: Automatic on PR deployments
- **Performance**: Min 80% score
- **Accessibility**: Min 90% score (enforced)
- **Best Practices**: Min 80% score
- **SEO**: Min 80% score

## 📁 Project Structure

```
photo-wall-planner/
├── app/                    # Next.js App Router pages
│   ├── projects/new/       # Project creation flow
│   │   ├── page.tsx       # Frame Inventory
│   │   ├── layout/        # Layout Generator
│   │   ├── photos/        # Photo Selection
│   │   ├── visualization/ # AR Visualization
│   │   └── details/       # Project Details
│   └── page.tsx           # Homepage
├── components/             # Reusable UI components
├── lib/                   # Utilities and configurations
├── tests/                 # Playwright E2E tests
├── .github/workflows/     # GitHub Actions CI/CD
└── docs/                  # Documentation
```

## 🎯 Current Status

✅ **Frontend Architecture Complete**
- 5-step project creation flow fully functional
- Responsive design with Tailwind CSS
- TypeScript integration
- Component-based architecture

⏳ **Next Priorities**
1. Implement missing navigation pages
2. Set up Supabase backend
3. Add user authentication
4. Integrate photo upload service
5. Implement data persistence

## 📊 Performance

- **Lighthouse Score**: 90+ (target)
- **Core Web Vitals**: Optimized
- **Mobile First**: Responsive design
- **Accessibility**: WCAG compliant

## 🤝 Contributing

1. Create feature branch from `develop`
2. Implement changes with tests
3. Submit pull request
4. Automatic preview deployment
5. Code review and merge

---

**Built with ❤️ using Next.js, TypeScript, and Vercel** 