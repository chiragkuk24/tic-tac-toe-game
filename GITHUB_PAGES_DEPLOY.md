# Deploy Tic Tac Toe Game to GitHub Pages

This guide will help you deploy the Tic Tac Toe game to GitHub Pages for free hosting.

## Prerequisites

1. A GitHub account (create one at [github.com](https://github.com) if you don't have one)
2. Git installed on your computer (download from [git-scm.com](https://git-scm.com))

## Deployment Steps

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., `tic-tac-toe-game`)
4. Choose "Public" visibility
5. **DO NOT** initialize with README, .gitignore, or license (we'll push existing files)
6. Click "Create repository"

### Step 2: Initialize Git and Push Code

Open terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Tic Tac Toe game"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tic-tac-toe-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/ (root)" folder
6. Click "Save"
7. Wait a few minutes for deployment to complete
8. Your site will be available at: `https://YOUR_USERNAME.github.io/tic-tac-toe-game/`

## Alternative: Using GitHub Desktop

If you prefer a graphical interface:

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop and sign in
3. Click "File" → "Add Local Repository"
4. Navigate to your project folder and select it
5. Click "Publish repository"
6. Enter repository name and description
7. Make sure "Keep this code private" is unchecked
8. Click "Publish repository"
9. Go to repository on GitHub.com → Settings → Pages → Enable as above

## Custom Domain (Optional)

To use a custom domain:

1. In GitHub Pages settings, enter your custom domain
2. Update DNS records with your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records for GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## Troubleshooting

### Page Not Loading
- Wait 1-2 minutes after enabling GitHub Pages
- Clear browser cache
- Check repository name matches URL exactly

### 404 Error
- Ensure `index.html` is in the root of your repository
- Check branch name is "main" (not "master")
- Verify GitHub Pages is enabled for the correct branch

### Mixed Content Warnings
- The game uses CDN resources (Font Awesome, Google Fonts)
- These should work fine on GitHub Pages

## Updating Your Game

To update the deployed game:

```bash
# Make changes to your files
git add .
git commit -m "Update game features"
git push origin main
```

GitHub Pages will automatically rebuild and deploy within 1-2 minutes.

## Testing Locally Before Deployment

You can test the game locally using the built-in HTTP server:

```bash
# If Python is installed
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Additional Notes

- GitHub Pages is free for public repositories
- Your game will be publicly accessible
- No server-side code is needed (static HTML/CSS/JS only)
- The game uses localStorage which works fine on GitHub Pages

## Support

If you encounter issues:
1. Check GitHub Pages documentation: [docs.github.com/pages](https://docs.github.com/pages)
2. Verify your repository structure matches the expected format
3. Ensure all game files are committed and pushed