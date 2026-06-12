# Disha — Study, Money & Career Coach

A Vite + React app, ready to deploy on Vercel.

## What changed from the Claude.ai artifact

- `window.storage` (Claude.ai's built-in persistence) is now polyfilled with
  `localStorage` in `src/storage.js` and wired up in `src/main.jsx`.
- The AI chat calls now go to `/api/chat` (a Vercel serverless function in
  `api/chat.js`) instead of calling the Anthropic API directly from the
  browser. The function holds your Anthropic API key server-side.

## Deploy steps — see the chat response for the full walkthrough

1. `npm install`
2. `npm run dev` to test locally (chat needs `vercel dev` + env var, see below)
3. Push to GitHub
4. Import the repo in Vercel
5. Add `ANTHROPIC_API_KEY` as an environment variable in Vercel project settings
6. Deploy
