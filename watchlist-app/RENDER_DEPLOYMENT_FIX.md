# 🔧 Render Deployment Fix Guide

## Common Issue: "Build directory doesn't exist"

This error typically occurs due to build process failures. Here's how to fix it:

### ✅ **Solution 1: Manual Configuration (Recommended)**

Instead of using `render.yaml`, configure manually in Render dashboard:

1. **Go to Render Dashboard** → New → Static Site
2. **Connect your GitHub repository**
3. **Configure these exact settings:**

   ```
   Build Command: npm ci && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variables:**
   ```
   NODE_VERSION = 18
   VITE_TMDB_API_KEY = 10069c04fb7414dd0a7683abb054c50b
   VITE_TMDB_BASE_URL = https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p
   ```

5. **Deploy!**

### ✅ **Solution 2: Fix Common Issues**

#### **Issue A: Node Version**
- Render might be using old Node version
- Solution: Add `NODE_VERSION=18` environment variable

#### **Issue B: Package Lock**
- Use `npm ci` instead of `npm install`
- Ensures consistent builds

#### **Issue C: Build Path**
- Make sure publish directory is exactly: `dist`
- No leading slash: ~~`/dist`~~ ❌
- Correct: `dist` ✅

### ✅ **Solution 3: Alternative Build Command**

If the standard build fails, try this enhanced build command:

```bash
npm ci && npm run build && ls -la dist
```

This will:
1. Clean install dependencies
2. Run the build
3. List the dist contents (for debugging)

### ✅ **Solution 4: Debugging Steps**

1. **Check Build Logs** in Render dashboard
2. **Look for these common errors:**
   - TypeScript compilation errors
   - Missing dependencies
   - Node version incompatibility
   - PostCSS/Tailwind issues

3. **If build succeeds but deployment fails:**
   - Verify `dist` folder exists in logs
   - Check publish directory setting is `dist`

### ✅ **Solution 5: Alternative Platforms**

If Render continues to have issues, these platforms work perfectly:

#### **Netlify (Often easier)**
1. Drag & drop the `dist` folder after running `npm run build`
2. Or connect GitHub with these settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

#### **Vercel (Very reliable)**
1. Connect GitHub repository
2. Vercel auto-detects Vite settings
3. Just add the environment variables

### 🔍 **Debug Your Build Locally**

Before deploying, always test:

```bash
# Clean build test
rm -rf dist node_modules
npm install
npm run build
ls -la dist/  # Should show index.html and assets/
```

### 📧 **Still Having Issues?**

If you're still getting the "build directory doesn't exist" error:

1. **Share the build logs** from Render dashboard
2. **Try Netlify** as a backup (often simpler)
3. **Use manual configuration** instead of render.yaml

The app works perfectly - it's just a configuration issue! 🎬✨
