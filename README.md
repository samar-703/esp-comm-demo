  # ESP Communications Modernization Demo

  This repository contains a static, frontend-only UI demo for a GSoC proposal about modernizing the ESP Website communications and email
  system.

  It is not a production implementation. There is:

  - no backend
  - no database
  - no authentication
  - no external API integration
  - no real email sending

  All content is driven by mocked local data and frontend state only.

  ## What this demo represents

  The demo visualizes the UI-level scope for three proposed deliverables:

  - Deliverable A: reusable email template system
  - Deliverable B: scheduled email sending flow and dashboard
  - Deliverable C: teacher communications panel

  It is intended to show:

  - what already exists in the ESP communications system
  - what this proposal adds at the product/UI layer
  - how the proposed workflows behave
  - how the proposed UX still fits the current `MessageRequest` / `TextOfEmail` queue architecture

  ## Current vs proposed model

  Current ESP communications model reflected in the demo:

  - admins already have a communications panel
  - recipient filtering, HTML composition, template variables, preview, and queued delivery already exist
  - the conceptual delivery path is:

    `Admin Comm Panel -> MessageRequest -> cron -> TextOfEmail -> Mail Backend`

  Proposed additions shown in this UI demo:

  - reusable template library with starter templates, preview, and template management flows
  - queue-first scheduling surfaced as a first-class workflow
  - scheduled email dashboard with status states, rescheduling, cancellation, and audit detail
  - teacher-facing communications panel with class-scoped restrictions and shared audit visibility

  The demo also shows optional SendGrid optimization visually, but keeps queue-based scheduling central because that best matches the current
  ESP architecture.

  ## Routes

  - `/` overview and current-vs-proposed framing
  - `/admin/compose` upgraded admin compose flow
  - `/admin/templates` template library
  - `/admin/templates/new` create-template mock
  - `/admin/templates/[id]/edit` edit-template mock
  - `/admin/scheduled` scheduled email dashboard
  - `/teacher/compose` teacher communications panel
  - `/architecture` technical architecture and workflow explanation

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
  - architecture explainer content

  ## Local development

  ```bash
  npm install
  npm run dev

  Then open http://localhost:3000.

  ## Production build

  npm run build

  The app is configured for static output so it can be deployed easily as a static Next.js app.

  ## Deploy to Vercel

  1. Push this repository to GitHub.
  2. Import the repository into Vercel.
  3. Keep the default Next.js framework settings.
  4. Deploy.

  Because the demo uses mocked local data only and no backend runtime, deployment should be straightforward.