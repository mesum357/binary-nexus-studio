# Render Deployment Setup Guide - Frontend

## Quick Setup Steps

### Step 1: Deploy as Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your Git repository
4. Configure the following settings:

#### Basic Settings:
- **Name**: `binary-nexus-frontend`
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave **empty** (frontend code is at root level)

#### Build Settings:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 2: Configure Environment Variables

Click on **"Environment"** tab and add:

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your backend API URL | `https://binary-nexus-backend.onrender.com` |

**Important Notes:**
- ✅ **NO trailing slash** (e.g., `https://api.example.com` NOT `https://api.example.com/`)
- ✅ Use **HTTPS** for production
- ✅ Replace with your actual backend URL

### Step 3: Deploy

1. Click **"Create Static Site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your frontend will be live at: `https://binary-nexus-frontend.onrender.com`

## Environment Variables Reference

### Required Variables

#### `VITE_API_URL`
- **Description**: Backend API endpoint URL
- **Format**: Full URL without trailing slash
- **Example**: `https://binary-nexus-backend.onrender.com`
- **Local Development**: `http://localhost:5000`
- **Note**: Must start with `VITE_` to be accessible in Vite frontend

## CORS Configuration

Make sure your backend allows requests from your frontend domain:

**Backend CORS Settings** (in `backend/server.js` or similar):

```javascript
cors({
  origin: [
    'https://binary-nexus-frontend.onrender.com',
    'http://localhost:5173', // For local development (Vite default)
  ],
  credentials: true,
})
```

## Pages and Routes

The frontend includes the following routes:
- `/` - Home page
- `/binary-hub` - Binary Hub section
- `/binary-hub/team` - Team page
- `/binary-hub/gallery` - Gallery page
- `/digital-services/courses` - Courses page
- `/digital-services/services` - Services page
- `/digital-services/internships` - Internships page
- `/digital-services/team` - Digital Services team
- `/consultancy` - Consultancy section
- `/consultancy/services` - Consultancy services
- `/consultancy/team` - Consultancy team
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/my-courses` - User courses page

All routes should work correctly with the `_redirects` file configured.

## Troubleshooting

### Build Fails

**Problem**: Build fails with "Cannot find module"

**Solution**: 
- Verify **Root Directory** is empty (since frontend is at root)
- Check that `package.json` exists in the root
- Check Node.js version (Render auto-detects, but ensure it's compatible)

### API Calls Fail (CORS Error)

**Problem**: `Access-Control-Allow-Origin` error in browser console

**Solution**:
1. Add your frontend URL to backend CORS origins
2. Ensure `credentials: 'include'` is set in API calls
3. Verify backend allows credentials: `credentials: true` in CORS config

### 404 on Page Refresh

**Problem**: Getting 404 when refreshing a page

**Solution**: 
- The `_redirects` file in `public/` should handle this automatically
- Verify `public/_redirects` is committed to your repository
- Check Render's static site settings for SPA routing

### Environment Variable Not Working

**Problem**: `VITE_API_URL` shows as undefined

**Solution**:
- Verify variable name starts with `VITE_`
- Rebuild the site after adding environment variables
- Check that the variable is set in Render dashboard (not just `.env` file)
- Clear browser cache and try again

### Images Not Loading

**Problem**: Images show broken links

**Solution**:
- Verify images are in `public/images/` folder
- Check image paths start with `/images/` (absolute paths)
- Ensure images are committed to repository
- Verify file names match exactly (case-sensitive on Linux servers)

## Manual Deployment

To manually trigger a deployment:

1. Go to your static site in Render
2. Click **"Manual Deploy"**
3. Select **"Deploy latest commit"**

## Updating Environment Variables

1. Go to your static site settings
2. Click **"Environment"** tab
3. Edit or add variables
4. Click **"Save Changes"**
5. Render will automatically rebuild with new variables

## Testing Local Build

Before deploying, test the production build locally:

```bash
npm install
VITE_API_URL=https://your-backend-url.onrender.com npm run build
npm run preview
```

Visit `http://localhost:4173` to preview the production build.

## Project Structure

```
.
├── src/              # Source code
├── public/           # Static assets (images, etc.)
├── dist/             # Build output (generated)
├── package.json      # Dependencies and scripts
├── vite.config.ts    # Vite configuration
└── render.yaml       # Render configuration (optional)
```

## Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- Check build logs in Render dashboard for specific errors

