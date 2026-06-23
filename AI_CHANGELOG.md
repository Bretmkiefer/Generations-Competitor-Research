# AI Changelog

This file is the shared context log for all LLMs working on this project.

## Rules for All LLMs

1. **Before making any changes** — read this entire file to understand what has already been done and why.
2. **After completing changes** — add a new entry at the top of the Log section below with:
   - Your name (e.g. `Claude Code`, `Codex`, `Gemini`, etc.)
   - The date
   - A clear description of what you changed and why

This ensures every LLM has full context on the project's history, regardless of which tool made prior changes.

---

## Log

<!-- Most recent entry goes at the TOP -->

### Claude Code — 2026-06-23 (2)
- Added `GET /pricing` and `POST /pricing` endpoints to the Supabase Edge Function, storing pricing data in the KV store.
- Rebuilt CostsDashboard to fetch live pricing from the API on load, falling back to hardcoded defaults if unavailable.
- Added inline editing: clicking the pencil icon on any model card makes fields editable; Save pushes the update to the API and persists it for all future loads.
- Status indicator shows whether data is live from API, showing defaults, or unreachable.
- Refresh button re-fetches from API at any time.

### Claude Code — 2026-06-23
- Built out the Costs tab (CostsDashboard.tsx) from its placeholder state into a full model pricing comparison.
- Added 6 Google Gemini/Imagen image generation models: Gemini 3.1 Flash Image, Gemini 3 Pro Image, Gemini 2.5 Flash Image, and Imagen 4 (Fast / Standard / Ultra).
- Each card shows per-image price by resolution tier, batch pricing (50% off), and input/output token rates where applicable.
- Imagen 4 models are flagged as deprecated (shutting down Aug 17, 2026).
- Pricing sourced from the official Google AI Developer API pricing page.

### Claude Code — 2026-06-22
- Replaced the single Product Research view with 9 tabs matching the sections in the Generations Product Research Google Doc/PDF.
- New tabs: Company Language, Path of Creation, Tables & Graphics, Images & Results (placeholder), Story Board (placeholder), To Do's.
- Updated color scheme across all existing tabs (Competitive Analysis, Customer Feedback, Tools & Tactics) from blue/indigo to the warm amber/brown palette matching the User Flow Maps navigation.
- All content populated from the PDF document.

### Codex - 2026-06-22
- Set the generated logo as the browser tab icon by adding favicon and Apple touch icon links in `index.html`.

### Codex - 2026-06-22
- Generated a new logo image for the website and saved it at `public/assets/user-flow-map-logo.png`.
- Kept the original generated image in the Codex generated-images folder and copied the project-ready version into the app.

### Codex - 2026-06-22
- Added `CODEX.md` so Codex sessions have an explicit read-before-edit and log-after-edit rule.
- Documented that the OneDrive project folder is the source of truth for future edits and GitHub pushes.

### Claude Code — 2026-06-22
- Created this file (`AI_CHANGELOG.md`) to serve as a shared context log across all LLMs working on this project.
- Created `CLAUDE.md` to enforce the read-before-edit, log-after-edit rule for Claude Code sessions.
