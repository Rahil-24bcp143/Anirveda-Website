# Troubleshooting Appwrite Sites Deployment

## Error 500 - Download Timeout

### Problem
Build times out with "Error 500 - download_timeout" error.

### Solutions Applied ✅

#### 1. Optimized Build Commands
Changed from `npm install` to `npm ci --prefer-offline --no-audit`:
- **npm ci**: Uses package-lock.json for faster, reproducible installs
- **--prefer-offline**: Uses cached packages when available
- **--no-audit**: Skips security audit to save time

#### 2. Faster Minification
Changed from `terser` to `esbuild` in vite.config.js:
- **esbuild**: 10-100x faster than terser
- **No sourcemaps**: Disabled in production for faster builds

#### 3. Better Chunk Splitting
Added separate chunks for:
- `react-vendor`: React core libraries
- `animation-vendor`: Framer Motion, GSAP, React Spring
- `appwrite`: Appwrite SDK

#### 4. Build Timeout Configuration
- Set build timeout to 600 seconds (10 minutes) in appwrite.json
- Increased chunk size warning limit to 1000 KB

#### 5. Node Version Lock
- Added `.nvmrc` with Node 18
- Added `.node-version` for compatibility

### Current Build Performance
```
Build time: ~3.6 seconds (locally)
Output size: 983 KB total
Chunks:
  - index.html: 2.25 KB
  - CSS: 60.59 KB
  - Appwrite: 23.18 KB
  - React vendor: 160.38 KB
  - Animation vendor: 235.37 KB
  - Main bundle: 503.86 KB
```

### Deploy Steps

1. **Commit Changes**
```bash
git add .
git commit -m "fix: Optimize build for Appwrite Sites deployment"
git push origin feat/mock-rbi
```

2. **Clear Appwrite Cache** (if redeploying)
   - Go to Appwrite Console
   - Sites → Your Site → Settings
   - Click "Clear Cache" if available
   - Or delete and recreate the site

3. **Redeploy**
   - Appwrite will auto-deploy on push
   - Or manually trigger deployment in console

### Additional Optimizations (If Still Timing Out)

#### Option 1: Lazy Load Heavy Components
```javascript
// In App.jsx, lazy load heavy pages
const HomePage = React.lazy(() => import('./Pages/HomePage'));
const LoadingScreen = React.lazy(() => import('./LoadingScreen'));

// Wrap routes with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    ...
  </Routes>
</Suspense>
```

#### Option 2: Disable Loading Screen for Faster Initial Load
```javascript
// In App.jsx
const [isLoading, setIsLoading] = useState(false); // Changed from true
```

#### Option 3: Reduce Animation Complexity
```javascript
// In LoadingScreen.jsx
const PARTICLE_COUNT = 20; // Reduced from 40
```

#### Option 4: Use CDN for Heavy Libraries
Move large libraries to CDN links in index.html instead of bundling.

## Other Common Issues

### Issue: Build Succeeds but Site Shows Blank Page

**Solution**: Check browser console for errors
```bash
# Check if environment variables are set
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=68e0e6c70006bba52ef3
```

### Issue: Appwrite Connection Errors

**Solution**: Verify Appwrite configuration
1. Check project ID in appwrite.js matches console
2. Verify endpoint URL is correct
3. Check database permissions in Appwrite Console

### Issue: Routes Don't Work (404 on Refresh)

**Solution**: Already configured in appwrite.json
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Issue: Build Logs Show "Out of Memory"

**Solution**: Add Node memory options
```json
// In package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
}
```

### Issue: CSS Not Loading Properly

**Solution**: Check base URL in vite.config.js
```javascript
export default defineConfig({
  base: '/', // Ensure this is set
  ...
})
```

## Monitoring Build Performance

### Local Testing
```bash
# Time the build
npm run build

# Check output size
du -sh dist/

# Test the built site locally
npm run preview
```

### Appwrite Console
1. Go to Sites → Your Site
2. Click on latest deployment
3. View "Build Logs" for details
4. Check deployment status

## Build Optimization Checklist

- [x] Use `npm ci` instead of `npm install`
- [x] Switch to esbuild minification
- [x] Disable sourcemaps in production
- [x] Split vendor chunks appropriately
- [x] Set build timeout to 600s
- [x] Lock Node version to 18
- [x] Increase chunk size warning limit
- [ ] Consider lazy loading heavy components
- [ ] Optimize images (use WebP format)
- [ ] Remove unused dependencies
- [ ] Use tree-shaking effectively

## Performance Tips

### 1. Analyze Bundle Size
```bash
npm run build -- --stats
npx vite-bundle-visualizer
```

### 2. Audit Dependencies
```bash
npm ls --depth=0
npm outdated
```

### 3. Remove Unused Code
```bash
npm prune
```

### 4. Optimize Images
- Use WebP format
- Compress images before committing
- Consider using Appwrite Storage for images

## Current Configuration Files

### .appwriterc
```json
{
  "projectId": "68e0e6c70006bba52ef3",
  "projectName": "Anirveda Website",
  "buildCommand": "npm ci --prefer-offline --no-audit && npm run build",
  "outputDirectory": "dist"
}
```

### vite.config.js
```javascript
build: {
  minify: 'esbuild', // Fast minification
  sourcemap: false,   // No sourcemaps
  chunkSizeWarningLimit: 1000
}
```

### appwrite.json
```json
{
  "buildTimeout": 600,
  "buildCommand": "npm ci --prefer-offline --no-audit && npm run build"
}
```

## Success Criteria

✅ Build completes in < 5 minutes
✅ All chunks load properly
✅ No 500 errors
✅ Site is accessible
✅ All routes work correctly
✅ Appwrite connection successful

## Need More Help?

1. Check build logs in Appwrite Console
2. Test build locally: `npm run build`
3. Verify environment variables
4. Check Appwrite Discord: https://discord.com/invite/appwrite
5. Review Appwrite Docs: https://appwrite.io/docs/products/sites

---

**Status**: ✅ Optimized  
**Build Time**: ~3.6s (local)  
**Bundle Size**: 983 KB  
**Last Updated**: October 5, 2025
