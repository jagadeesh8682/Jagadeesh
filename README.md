# Jagadeesh S Portfolio + JAG-AI

Professional portfolio website with an integrated AI assistant that supports chat, voice, and video interaction.

## Features

- Personal portfolio sections (about, skills, experience, projects, contact)
- JAG-AI assistant with three modes:
  - Chat AI
  - Voice assistant (speech-to-text + text-to-speech)
  - Video call AI (camera + mic + AI response flow)
- Offline knowledge-base fallback (works without API key)
- Optional live AI integration (Groq or OpenAI)
- Responsive UI and animated components

## Project Structure

- `index.html` - Main portfolio page and AI modal markup
- `css/style.css` - Styling, layout, animation, responsive rules
- `js/main.js` - Portfolio UI interactions
- `js/ai-agent.js` - AI assistant logic (chat, voice, video)
- `assets/` - Profile and static media assets
- `serve.py` - Local development server

## Run Locally

Use a local server because browser mic/camera APIs are blocked on `file://`.

```bash
python3 serve.py
```

Then open:

- `http://localhost:8080`

## AI Configuration

The assistant supports:

- Offline mode: uses built-in response patterns
- Online mode: uses API provider and key from browser localStorage

Current providers in code:

- Groq (`llama-3.1-8b-instant`)
- OpenAI (`gpt-4o-mini`)

## Security Note

Do not commit production API keys in frontend JavaScript.

If deploying publicly, move AI calls to a backend proxy and keep keys on the server.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Push this project to the default branch (`main`).
3. Open repository settings.
4. Go to `Pages`.
5. Set source to `Deploy from a branch`.
6. Select branch `main` and folder `/ (root)`.
7. Save and wait for deployment.

Your site will be available at:

- `https://<username>.github.io/<repo-name>/`

## Recommended Next Improvements

- Move AI API calls to a secure backend
- Add analytics and SEO metadata
- Add test scripts for core UI and voice flows
- Add CI workflow for lint and deployment
