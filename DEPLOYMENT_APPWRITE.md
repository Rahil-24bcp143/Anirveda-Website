# Deploying to Appwrite Sites

This guide will help you deploy the Anirveda Website from GitHub to Appwrite Sites.

## Prerequisites

1. **Appwrite Cloud Account**: Sign up at https://cloud.appwrite.io
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Appwrite Project**: Project ID `68e0e6c70006bba52ef3`

## Deployment Steps

### 1. Access Appwrite Console

1. Go to https://cloud.appwrite.io
2. Navigate to your project: **Anirveda Website**
3. Click on **"Sites"** in the left sidebar

### 2. Create New Site

1. Click **"Create Site"** button
2. Choose **"Connect Git Repository"**
3. Authorize GitHub access if prompted
4. Select your repository: `Rahil-24bcp143/Anirveda-Website`
5. Select branch: `feat/mock-rbi` (or `main` for production)

### 3. Configure Build Settings

Appwrite will auto-detect your configuration from `.appwriterc` and `appwrite.json`, but verify:

- **Framework**: Vite (React)
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (leave empty or use `.`)

### 4. Set Environment Variables

In the Appwrite Console, under your site's **Settings** → **Environment Variables**, add:

```
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=68e0e6c70006bba52ef3
```

**Note**: Do NOT add `VITE_APPWRITE_API_KEY` unless absolutely necessary. For client-side apps, API keys should not be exposed.

### 5. Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-site-name.appwrite.global`

### 6. Custom Domain (Optional)

To use your custom domain `osailpdeu.in`:

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `osailpdeu.in`
4. Add the CNAME records to your DNS provider:
   - Host: `@` (or leave empty)
   - Points to: `[your-appwrite-domain]`
5. Wait for DNS propagation (5-30 minutes)

### 7. Configure Automatic Deployments

Appwrite Sites automatically deploys when you push to your connected branch:

- **Production**: Deploy from `main` branch
- **Preview**: Deploy from `feat/mock-rbi` or other branches

To configure:
1. Go to **Settings** → **Git**
2. Enable **"Auto Deploy"**
3. Set production branch to `main`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test MockRBI functionality (login, situations, leaderboard)
- [ ] Check Appwrite database connections
- [ ] Test on mobile devices
- [ ] Verify custom domain works (if configured)
- [ ] Check all API endpoints are accessible
- [ ] Test authentication flows

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Solution: Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Build command failed"**
- Solution: Check build logs in Appwrite Console
- Verify `vite.config.js` settings

### Environment Variables Not Working

- Ensure variable names start with `VITE_` prefix
- Check spelling and values in Appwrite Console
- Redeploy after adding/updating variables

### 404 Errors on Refresh

- This should be handled by the rewrite rules in `appwrite.json`
- If issues persist, check the hosting configuration

## Differences from Vercel

| Feature | Vercel | Appwrite Sites |
|---------|--------|----------------|
| Config File | `vercel.json` | `appwrite.json` or `.appwriterc` |
| Environment | Vercel Dashboard | Appwrite Console |
| Custom Domains | Automatic SSL | Manual CNAME + Auto SSL |
| Edge Functions | Yes | Coming soon |
| Analytics | Built-in | Use Appwrite Analytics |

## Additional Resources

- [Appwrite Sites Documentation](https://appwrite.io/docs/products/sites)
- [Migration from Vercel Guide](https://appwrite.io/docs/products/sites/migrations/vercel)
- [Appwrite Console](https://cloud.appwrite.io)

## Support

If you encounter issues:
1. Check Appwrite Console build logs
2. Visit [Appwrite Discord](https://discord.com/invite/appwrite)
3. Check [Appwrite GitHub Issues](https://github.com/appwrite/appwrite/issues)

---

**Last Updated**: October 2025
**Project**: Anirveda Website - MockRBI Quiz Platform
