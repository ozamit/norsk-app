# Norwegian Learning App - Development Workflow

## Branches

### `main` (Production)
- Deployed to:
  - **Frontend**: https://norsk-app.vercel.app
  - **Backend**: https://norwegian-quiz-api.onrender.com
- Only merge stable, tested features here
- Automatic deployment on push

### `dev` (Development)
- For local development
- Uses localhost for backend (port 5001)
- Test features here before merging to main

## Local Development

1. Make sure you're on the `dev` branch:
   ```bash
   git checkout dev
   ```

2. Start backend:
   ```bash
   cd server
   npm run dev
   ```

3. Start frontend (in a new terminal):
   ```bash
   npm run dev
   ```

4. App runs at `http://localhost:5173`

## Deploying Changes

1. Test thoroughly on `dev` branch locally
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Your message"
   ```

3. Merge to `main` when ready:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

4. Vercel and Render will auto-deploy the changes

## Environment Variables

- **Local**: Uses `.env` file (already configured for localhost)
- **Production**: 
  - Vercel: `VITE_API_URL=https://norwegian-quiz-api.onrender.com`
  - Render: `MONGODB_URI=[your connection string]`
