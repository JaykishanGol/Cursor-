# 🔧 How to Resolve GitHub Merge Conflict

## The Issue
You're getting a merge conflict on `render.yaml` when trying to push/merge on GitHub.

## ✅ Solution Options

### **Option 1: Fix via GitHub Web Interface (Easiest)**

1. **Go to your GitHub repository**
2. **Click on the conflicted file** (`render.yaml`)
3. **You'll see conflict markers like:**
   ```yaml
   <<<<<<< HEAD
   # Some content
   =======
   # Different content
   >>>>>>> branch-name
   ```
4. **Delete the conflict markers** and keep the correct content:
   ```yaml
   services:
     - type: web
       name: watchlist-app
       env: static
       buildCommand: npm ci && npm run build
       staticPublishPath: ./dist
       envVars:
         - key: NODE_VERSION
           value: "18"
         - key: VITE_TMDB_API_KEY
           value: 10069c04fb7414dd0a7683abb054c50b
         - key: VITE_TMDB_BASE_URL
           value: https://api.themoviedb.org/3
         - key: VITE_TMDB_IMAGE_BASE_URL
           value: https://image.tmdb.org/t/p
   ```
5. **Click "Resolve conflicts"**
6. **Commit the merge**

### **Option 2: Fix via Command Line**

```bash
# If you haven't already, pull the conflicted branch
git pull origin main  # or whatever branch you're merging

# Edit the render.yaml file to remove conflict markers
# Keep only the content above (without <<<<<<, =======, >>>>>> markers)

# Add and commit the resolved file
git add render.yaml
git commit -m "Resolve merge conflict in render.yaml"
git push
```

### **Option 3: Delete and Recreate (Nuclear Option)**

If the conflict is too messy:

```bash
# Delete the conflicted file
git rm render.yaml
git commit -m "Remove conflicted render.yaml"

# Recreate it with clean content
cp render.yaml.clean render.yaml
git add render.yaml
git commit -m "Add clean render.yaml configuration"
git push
```

### **Option 4: Skip render.yaml Entirely**

**Recommended**: Don't use render.yaml at all!

1. **Delete render.yaml** from your repository
2. **Configure manually** in Render dashboard instead:
   - Build Command: `npm ci && npm run build`
   - Publish Directory: `dist`
   - Add environment variables manually

This is often more reliable than configuration files.

## 🎯 **Quick Deploy Alternative**

While fixing the Git conflict, you can still deploy immediately:

### **Deploy to Netlify (No conflicts)**
1. Run `npm run build` locally
2. Drag `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Your app is live in 30 seconds! ✨

### **Deploy to Vercel**
1. Import your repository to Vercel
2. Add environment variables in dashboard
3. Deploy!

## 💡 **Prevention**

To avoid future conflicts:
- Always pull before making changes
- Use shorter, simpler config files
- Consider manual dashboard configuration over config files

Choose the option that feels most comfortable to you! The app itself is perfect - this is just a Git housekeeping issue. 🎬✨
