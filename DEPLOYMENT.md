# 🚀 Digitaliza - Production Deployment Guide

## 🌐 Vercel Deployment (Recommended)

### Step 1: Fork/Upload Repository
1. Upload project to GitHub/GitLab
2. Connect repository to Vercel

### Step 2: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
# Required for Production
DATABASE_URL=file:./prod.db
NEXTAUTH_SECRET=your-super-secret-production-key-min-32-chars
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=Digitaliza
```

### Step 3: Deploy
```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel --prod
```

### Step 4: Custom Domain (Optional)
1. Add custom domain in Vercel Dashboard
2. Update environment variables:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

## 🗄️ Database Configuration

### Development (SQLite)
- Uses local file: `./dev.db`
- No additional setup required

### Production Options

#### Option 1: Turso (Recommended - Free tier)
```env
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

#### Option 2: PlanetScale (MySQL)
```env
DATABASE_URL=mysql://username:password@host:port/database?sslaccept=strict
```

#### Option 3: Neon (PostgreSQL)
```env
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require
```

## 🔧 Build Configuration

### Optimized for Performance
- Bundle size: <150KB
- Core Web Vitals optimized
- Mobile-first responsive
- Tree-shaking enabled
- Console removal in production

### Build Commands
```bash
npm run build    # Production build
npm run start    # Production server
npm run type-check  # TypeScript validation
```

## 🛡️ Security Checklist

- [x] NEXTAUTH_SECRET set (32+ characters)
- [x] Database credentials secured
- [x] No secrets in code
- [x] HTTPS enforced
- [x] CORS configured
- [x] Admin authentication

## 📊 Monitoring Setup

### Performance
- Vercel Analytics (built-in)
- Core Web Vitals tracking
- Real User Monitoring

### Error Tracking (Optional)
```env
SENTRY_DSN=your-sentry-dsn
```

### Analytics (Optional)
```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🚦 Post-Deployment Checklist

1. **Test Core Features**
   - [ ] Templates load correctly
   - [ ] Admin login works
   - [ ] Menu management functional
   - [ ] QR code generation works
   - [ ] WhatsApp integration active

2. **Performance Verification**
   - [ ] Lighthouse score >95
   - [ ] Load time <2s
   - [ ] Mobile responsiveness
   - [ ] Core Web Vitals green

3. **SEO Setup**
   - [ ] Meta tags configured
   - [ ] OpenGraph images
   - [ ] Sitemap generated
   - [ ] Robots.txt configured

## 🔄 CI/CD Pipeline

### Automatic Deployment
- **Main branch** → Production deployment
- **Feature branches** → Preview deployments
- **Pull requests** → Preview environments

### Build Optimization
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["iad1"]
}
```

## 📱 Testing Production

### Demo URLs Structure
```
https://yourdomain.com/demo/sakura-sushi     # Japanese template
https://yourdomain.com/demo/nonna-italiana   # Italian template
https://yourdomain.com/demo/mariachi-cantina # Mexican template
https://yourdomain.com/demo/brew-coffee      # Coffee template
```

### Admin Access
```
https://yourdomain.com/admin/restaurant-slug
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check TypeScript errors: `npm run type-check`
- Verify all dependencies: `npm install`

**Database Connection**
- Verify DATABASE_URL format
- Check database provider compatibility
- Ensure Prisma schema is pushed

**Authentication Issues**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches domain
- Confirm callback URLs

### Performance Issues
- Enable compression in Vercel
- Optimize images with Next.js Image
- Check bundle analyzer
- Monitor Core Web Vitals

---

**Ready for Production** ✅ **Performance Optimized** ⚡ **Mobile-First** 📱