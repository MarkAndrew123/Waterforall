# WAFI Backend - Supabase + Render Deployment

## Environment Variables for Render

Set these in your Render dashboard under Environment:

```env
NODE_ENV=production
SUPABASE_URL=https://mfuggyznowixfckbsgcf.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdWdneXpub3dpeGZja2JzZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2Mzc0NDQsImV4cCI6MjA4MDIxMzQ0NH0.aoZSeOfzxWmFh3CREloS9gxhO4vEF8-UqapD7JFUWYY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdWdneXpub3dpeGZja2JzZ2NmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDYzNzQ0NCwiZXhwIjoyMDgwMjEzNDQ0fQ.-NG_twLN2jXe7ZY1YQXULQRrcncLymAK4VElqDneNDU
FRONTEND_URL=https://your-netlify-site.netlify.app
```

## Deployment Steps

### Step 1: Create Database Tables in Supabase

1. Go to https://supabase.com/dashboard
2. Select your project (mfuggyznowixfckbsgcf)
3. Click "SQL Editor" in the left sidebar
4. Copy and paste contents of `supabase-schema.sql`
5. Click "Run"

### Step 2: Deploy to Render

1. Push this code to GitHub
2. Go to https://render.com
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: wafi-backend
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Add Environment Variables (from above)
7. Click "Create Web Service"

### Step 3: Update Frontend API URL

After Render gives you a URL (e.g., `https://wafi-backend.onrender.com`), update the frontend to use it.

## Local Development

```bash
# Copy .env.example to .env and fill in values
npm install
npm run dev
```
