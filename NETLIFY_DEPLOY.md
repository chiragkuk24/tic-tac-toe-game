# Netlify Deployment Guide for Tic Tac Toe Game

## Method 1: Drag & Drop (Easiest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project folder (`d:/Roo-Code`) and drop it in the browser
3. Netlify will automatically upload and deploy your site
4. You'll get a URL like: `https://[random-name].netlify.app`

## Method 2: Connect GitHub Repository
1. Sign in to [Netlify](https://netlify.com) with your GitHub account
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize Netlify
4. Choose your repository (if you've pushed to GitHub)
5. Configure build settings:
   - Build command: (leave empty for static site)
   - Publish directory: `.` (current directory)
6. Click "Deploy site"

## Method 3: Netlify CLI (Advanced)
If you have Node.js installed:
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

## Files Ready for Netlify:
- ✅ `index.html` - Main entry point
- ✅ `style.css` - Styles
- ✅ `script.js` - Game logic
- ✅ `favicon.svg` - Icon
- ✅ `netlify.toml` - Netlify configuration
- ✅ `README.md` - Documentation

## Netlify Configuration (`netlify.toml`):
- Sets root directory as publish directory
- Configures proper redirects (all routes to index.html for SPA)
- Adds security headers

## After Deployment:
1. Your game will be available at your Netlify subdomain
2. You can set up a custom domain in Netlify settings
3. Enable HTTPS automatically (Netlify provides SSL certificates)
4. Deployments are automatic if connected to GitHub (push to trigger)

## Testing:
Before deploying, test locally at: http://localhost:8000

## Notes:
- Netlify provides free hosting for static sites
- No server configuration needed
- Automatic SSL certificates
- CDN distribution for fast loading worldwide
- Form handling and serverless functions available if needed later

## Support:
If you encounter issues:
1. Check Netlify deployment logs
2. Ensure all files are in the root directory
3. Verify `index.html` is the main entry point
4. Contact Netlify support or check their documentation