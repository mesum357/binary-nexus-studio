# Binary Nexus Studio - Setup Guide

Complete setup instructions for the Binary Nexus Studio project with backend authentication.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## Project Structure

```
binary-nexus-studio/
├── backend/                 # Node.js/Express backend
├── src/                     # React frontend
├── public/                  # Static assets
├── package.json             # Frontend dependencies
└── SETUP.md                 # This file
```

## Setup Steps

### 1. Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Create environment file (optional - for custom API URL):
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```bash
cp .env.example .env
```

4. Update backend `.env` with your configuration:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/binary_hub

# Server Configuration
PORT=5000

# Session Secret (change this!)
SESSION_SECRET=your-super-secret-session-key-change-in-production

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### 3. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env` with your Atlas connection string

### 4. Running the Application

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Terminal 2 - Frontend Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Features Implemented

### Authentication System

- ✅ User sign up with email and password
- ✅ User sign in
- ✅ Secure session-based authentication with Passport.js
- ✅ Protected routes (course enrollment requires authentication)
- ✅ Sign out functionality
- ✅ Persistent auth state across page refreshes

### UI Components

- ✅ Navbar with auth buttons (Sign In/Sign Up)
- ✅ User profile dropdown with avatar
- ✅ Mobile-responsive navbar
- ✅ Sign In and Sign Up pages
- ✅ Protected enrollment page

### Backend

- ✅ Express.js REST API
- ✅ MongoDB integration with Mongoose
- ✅ Passport.js local strategy authentication
- ✅ bcryptjs password hashing
- ✅ Express sessions
- ✅ CORS configuration

## Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Click "Sign Up" to create an account
4. After signup, you'll be automatically signed in
5. Try enrolling in a course - the form will be pre-filled with your details
6. Click your profile avatar in the navbar to sign out

## Troubleshooting

### Backend won't start

- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Authentication not working

- Ensure backend server is running
- Check browser console for CORS errors
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Clear browser cookies and try again

### Can't connect to MongoDB

- Verify MongoDB is running (local) or cluster is active (Atlas)
- Check connection string in `.env`
- For Atlas, ensure your IP is whitelisted

## Production Deployment

### Backend

- Use a process manager like PM2
- Update `SESSION_SECRET` to a strong random string
- Use MongoDB session store or Redis for sessions
- Enable HTTPS
- Set `NODE_ENV=production`

### Frontend

```bash
npm run build
```

Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)

## Support

For issues or questions, refer to the project documentation or contact the development team.

