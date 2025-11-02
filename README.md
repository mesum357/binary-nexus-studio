# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e142e5a6-73a4-43f6-9f9f-039494bfd695

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e142e5a6-73a4-43f6-9f9f-039494bfd695) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Render (Recommended)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions on Render.

**Quick Steps:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new Static Site
3. Connect your repository
4. Set build command: `npm install && npm run build`
5. Set publish directory: `dist`
6. Add environment variable: `VITE_API_URL` = your backend API URL

### Option 2: Lovable

Simply open [Lovable](https://lovable.dev/projects/e142e5a6-73a4-43f6-9f9f-039494bfd695) and click on Share -> Publish.

## Environment Variables

The frontend requires the following environment variable:

- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000`)

For production, set this to your deployed backend URL:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
