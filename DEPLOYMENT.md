# Frontend Deployment Guide for Render

This guide will help you deploy the Binary Nexus Frontend to Render.

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- Your backend API deployed on Render (or another hosting service)
- Git repository with your code

## Deployment Steps

### 1. Connect Your Repository to Render

1. Go to your Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your Git repository
4. Select the repository containing the frontend code

### 2. Configure Build Settings

- **Name**: `binary-nexus-frontend` (or your preferred name)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (frontend is at root) OR set to `.` if needed
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### 3. Environment Variables

Add the following environment variable in the Render dashboard:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com` | Your backend API URL (no trailing slash) |

**Important**: 
- Replace `your-backend-url.onrender.com` with your actual backend URL
- If your backend is on a different domain, use that URL instead
- Make sure CORS is configured on your backend to allow requests from your frontend domain

### 4. Deploy

1. Click "Create Static Site"
2. Render will automatically:
   - Install dependencies
   - Run the build command
   - Deploy the static files
3. Your frontend will be available at: `https://your-frontend-name.onrender.com`

## Environment Variables Setup

### In Render Dashboard:

1. Go to your static site settings
2. Click on "Environment"
3. Add the environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend API URL (e.g., `https://binary-nexus-backend.onrender.com`)

### Important Notes:

- **Vite Environment Variables**: Variables must be prefixed with `VITE_` to be accessible in the frontend
- **No Trailing Slash**: Don't add a trailing slash to your API URL
- **HTTPS**: Use HTTPS URLs for production
- **CORS**: Ensure your backend allows requests from your frontend domain

## Post-Deployment Checklist

- [ ] Verify the frontend loads correctly
- [ ] Test navigation and routing
- [ ] Test API connections
- [ ] Test authentication (sign in/sign up)
- [ ] Test course enrollment
- [ ] Verify file uploads work (if applicable)
- [ ] Check that images load correctly
- [ ] Test responsive design on mobile

## Troubleshooting

### Build Fails

- Check that `Root Directory` is set correctly (usually empty or `.`)
- Verify Node.js version (Render should auto-detect)
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`

### API Calls Fail

- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend allows credentials (`credentials: 'include'`)
- Verify backend CORS configuration includes your frontend domain

### Routing Issues (404 on Refresh)

- The `_redirects` file should handle this
- If issues persist, check Render's SPA routing settings
- Ensure `public/_redirects` is in your repository

### Images Not Loading

- Verify image paths are correct (should start with `/images/`)
- Check that images are in the `public/images` folder
- Ensure images are committed to your repository
- Verify image file names match exactly (case-sensitive)

## Alternative: Using render.yaml

If you prefer using `render.yaml`:

1. Ensure the `render.yaml` file is in the root of your repository
2. In Render, select "New" → "Blueprint"
3. Connect your repository
4. Render will read the configuration from `render.yaml`

## Updating Deployment

Render automatically redeploys when you push to your connected branch. To manually trigger a deployment:

1. Go to your static site in Render
2. Click "Manual Deploy" → "Deploy latest commit"

## Local Development

To test the build locally:

```bash
npm install
npm run build
npm run preview
```

This will build and preview the production version locally at `http://localhost:4173`.

## Support

For issues specific to:
- **Render**: Check [Render documentation](https://render.com/docs)
- **Vite**: Check [Vite documentation](https://vitejs.dev)
- **Build errors**: Check build logs in Render dashboard

