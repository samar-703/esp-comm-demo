# ESP Communications Modernization Demo

This repository is a static frontend-only UI demo for a GSoC proposal about modernizing the ESP Website communications and email system.

It is not a real product implementation. There is:

- no backend
- no database
- no authentication
- no external API
- no real email sending

All content is driven by mocked local data and frontend state only.

## What this demo represents

The demo shows the UI-level scope for three proposed deliverables:

- Deliverable A: reusable email template system
- Deliverable B: scheduled email sending flow and dashboard
- Deliverable C: teacher communications panel

It is designed to explain:

- what exists today in the ESP communications system
- what this proposal adds
- how the new workflows behave
- how the proposed UX still fits the current MessageRequest / TextOfEmail queue architecture

## Current vs proposed

Current ESP communications model reflected in the demo:

- admins already have a communications panel
- recipient selection, HTML composition, variable insertion, preview, and queued delivery already exist
- the conceptual delivery path is:
  `Admin Comm Panel -> MessageRequest -> cron -> TextOfEmail -> Mail Backend`

Proposed additions shown in this UI demo:

- reusable template library with starter templates and preview
- queue-first scheduling surfaced as a first-class UX
- scheduled email dashboard with status states and audit details
- teacher-facing communications panel with class-scoped restrictions

Optional SendGrid optimization is shown visually, but it is intentionally secondary to queue-based scheduling.

## Routes

- `/` overview and current vs proposed framing
- `/admin/compose` main upgraded admin compose flow
- `/admin/templates` template library
- `/admin/templates/new` create-template mock
- `/admin/templates/[id]/edit` edit-template mock
- `/admin/scheduled` scheduled/pending email dashboard
- `/teacher/compose` teacher communications panel
- `/architecture` technical architecture and flow explanation

## Mocked data

All data is local and mocked, including:

- programs
- users
- preview personas
- classes
- templates
- scheduled email jobs
- audit events
- warnings
- architecture explainer copy

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The app is configured for static output so it can be deployed as a static Next.js export.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Keep the default Next.js framework settings.
4. Deploy.

Because the demo uses mocked local data only and no backend runtime, deployment should be straightforward.
