# Appwrite Sites Migration Checklist

Use this checklist to ensure a smooth migration from Vercel to Appwrite Sites.

## Pre-Migration Checklist

- [x] ✅ `.appwriterc` configuration file created
- [x] ✅ `appwrite.json` hosting configuration created
- [x] ✅ `.gitignore` updated to exclude Appwrite files
- [x] ✅ Build tested locally and passes
- [x] ✅ All dependencies listed in `package.json`
- [ ] 🔲 Environment variables documented
- [ ] 🔲 Custom domain DNS records ready (if using `osailpdeu.in`)

## Git Repository Checklist

- [ ] 🔲 All changes committed to Git
- [ ] 🔲 Changes pushed to GitHub
- [ ] 🔲 Branch `feat/mock-rbi` is up to date
- [ ] 🔲 Repository is accessible (public or Appwrite has access)

## Appwrite Console Setup

### 1. Create Site

- [ ] 🔲 Logged into https://cloud.appwrite.io
- [ ] 🔲 Navigated to project: "Anirveda Website" (ID: `68e0e6c70006bba52ef3`)
- [ ] 🔲 Clicked "Sites" in sidebar
- [ ] 🔲 Clicked "Create Site"
- [ ] 🔲 Connected GitHub repository
- [ ] 🔲 Selected repository: `Rahil-24bcp143/Anirveda-Website`
- [ ] 🔲 Selected branch: `feat/mock-rbi`

### 2. Configure Build Settings

Verify these settings (should auto-detect):

- [ ] 🔲 Framework: **Vite**
- [ ] 🔲 Build Command: `npm install && npm run build`
- [ ] 🔲 Output Directory: `dist`
- [ ] 🔲 Install Command: `npm install`
- [ ] 🔲 Root Directory: `.` (or leave empty)

### 3. Environment Variables

Add these in Appwrite Console → Sites → Settings → Environment Variables:

- [ ] 🔲 `VITE_APPWRITE_ENDPOINT` = `https://fra.cloud.appwrite.io/v1`
- [ ] 🔲 `VITE_APPWRITE_PROJECT_ID` = `68e0e6c70006bba52ef3`

⚠️ **Note**: Do NOT add `VITE_APPWRITE_API_KEY` for client-side apps

### 4. Deploy

- [ ] 🔲 Clicked "Deploy" button
- [ ] 🔲 Build started successfully
- [ ] 🔲 Build completed without errors
- [ ] 🔲 Site URL generated (e.g., `https://[name].appwrite.global`)

## Post-Deployment Testing

### Functionality Tests

- [ ] 🔲 Homepage loads correctly
- [ ] 🔲 Navigation works (all pages accessible)
- [ ] 🔲 MockRBI routes work:
  - [ ] 🔲 `/mock-rbi` landing page
  - [ ] 🔲 `/mock-rbi/adminlogin` - Admin login
  - [ ] 🔲 `/mock-rbi/adminpanel` - Admin panel
  - [ ] 🔲 `/mock-rbi/playerlogin` - Player login
  - [ ] 🔲 `/mock-rbi/playerpanel` - Player panel
  - [ ] 🔲 `/mock-rbi/leaderboard` - Leaderboard

### Appwrite Integration Tests

- [ ] 🔲 Admin can log in
- [ ] 🔲 Admin can create situations
- [ ] 🔲 Teams can log in
- [ ] 🔲 Teams can view situations
- [ ] 🔲 Teams can submit answers
- [ ] 🔲 Scores update correctly
- [ ] 🔲 Leaderboard displays teams
- [ ] 🔲 Leaderboard updates in real-time
- [ ] 🔲 Timer works correctly
- [ ] 🔲 Auto-submit on timeout works

### UI/UX Tests

- [ ] 🔲 All images load
- [ ] 🔲 CSS styles applied correctly
- [ ] 🔲 Animations work smoothly
- [ ] 🔲 Responsive design on mobile
- [ ] 🔲 Responsive design on tablet
- [ ] 🔲 No console errors in browser

### Performance Tests

- [ ] 🔲 Page load time < 3 seconds
- [ ] 🔲 No broken links
- [ ] 🔲 Assets cached properly
- [ ] 🔲 No CORS errors

## Custom Domain Setup (Optional)

If migrating from `osailpdeu.in`:

### DNS Configuration

- [ ] 🔲 Accessed DNS provider (e.g., GoDaddy, Cloudflare, Namecheap)
- [ ] 🔲 Added CNAME record:
  - Host: `@` or `www`
  - Points to: `[your-appwrite-site-url].appwrite.global`
  - TTL: 300 (or automatic)

### Appwrite Console

- [ ] 🔲 Went to Sites → Settings → Domains
- [ ] 🔲 Clicked "Add Domain"
- [ ] 🔲 Entered: `osailpdeu.in`
- [ ] 🔲 Verified domain ownership
- [ ] 🔲 SSL certificate issued (automatic)
- [ ] 🔲 Domain status: "Active"

### Domain Testing

- [ ] 🔲 `https://osailpdeu.in` loads correctly
- [ ] 🔲 SSL certificate valid (🔒 in browser)
- [ ] 🔲 HTTP redirects to HTTPS
- [ ] 🔲 `www` subdomain works (if configured)

## Automatic Deployments

### Configuration

- [ ] 🔲 Went to Settings → Git
- [ ] 🔲 Enabled "Auto Deploy"
- [ ] 🔲 Set production branch: `main` (or keep `feat/mock-rbi`)
- [ ] 🔲 Tested: Pushed commit → Automatic deployment triggered

## Cleanup (After Successful Migration)

### Vercel Cleanup

- [ ] 🔲 Backed up Vercel environment variables
- [ ] 🔲 Downloaded deployment logs (if needed)
- [ ] 🔲 Updated DNS to point to Appwrite (if using custom domain)
- [ ] 🔲 Disabled/deleted Vercel project (optional)

### Repository Cleanup

- [ ] 🔲 Updated README with new deployment info
- [ ] 🔲 Archived or removed `vercel.json` (optional - can keep for reference)
- [ ] 🔲 Updated documentation links
- [ ] 🔲 Notified team members of new deployment URL

## Rollback Plan (If Needed)

If issues occur, you can rollback:

1. **Keep Vercel Running**: Don't delete Vercel project until confident
2. **DNS Switching**: Point DNS back to Vercel if issues
3. **Debugging**: Check Appwrite Console → Build Logs for errors
4. **Support**: Contact Appwrite Discord/Support if needed

## Success Criteria

✅ Migration is successful when:

- [ ] 🔲 Site loads at new URL
- [ ] 🔲 All features work correctly
- [ ] 🔲 No errors in console
- [ ] 🔲 Performance is acceptable
- [ ] 🔲 Custom domain configured (if applicable)
- [ ] 🔲 Auto-deployments working
- [ ] 🔲 Team is notified
- [ ] 🔲 Old Vercel project disabled

## Notes & Issues

Document any issues encountered during migration:

```
[Date] - [Issue Description] - [Resolution]

Example:
2025-10-05 - Build failed due to missing env var - Added VITE_APPWRITE_PROJECT_ID
```

---

**Migration Date**: _____________

**Performed By**: _____________

**New Site URL**: _____________

**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Completed | ⬜ Failed
