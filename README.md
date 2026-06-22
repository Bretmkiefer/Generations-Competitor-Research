# Generations User Flow Maps

React app for mapping AI product user flows, screenshots, notes, click counts, and competitive research.

## Local Setup

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and add your Supabase project values:

```env
VITE_SUPABASE_PROJECT_ID=your-supabase-project-id
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The app falls back to browser storage if the Supabase function is unavailable.

## Vercel

This repo is ready for Vercel as a Vite app.

Add these Vercel environment variables:

```env
VITE_SUPABASE_PROJECT_ID=your-supabase-project-id
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Vercel build settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

## Supabase

Install and log into the Supabase CLI, then link the project:

```bash
supabase login
supabase link --project-ref your-supabase-project-id
```

Apply the database migration:

```bash
supabase db push
```

Deploy the Edge Function:

```bash
supabase functions deploy make-server-0d49d71e
```

The frontend calls:

```text
https://<project-id>.supabase.co/functions/v1/make-server-0d49d71e
```

The Edge Function uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, which Supabase provides automatically in the hosted function environment.

## GitHub

```bash
git init
git add .
git commit -m "Initial user flow maps app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
