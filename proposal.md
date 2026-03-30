Communications Improvements for the ESP Website
Google Summer of Code 2026 - Learning Unlimited

The Thing I Want to Do This Summer
I want to modernize the ESP Website's communications panel (comm panel) - the tool administrators use to email students, teachers, and parents for Splash and other Learning Unlimited programs. Right now, admins write HTML emails from scratch every time, can't schedule emails for future delivery, and teachers have no way to email their own students directly. I will fix all three problems by building:(1) a reusable email template system with a selection UI and live preview,(2) scheduled email sending backed by SendGrid's API with a cron-based fallback, and (3) a dedicated teacher comm panel for emailing enrolled students. These improvements will bring the comm panel up to par with modern email tools like MailChimp, reduce manual work every program cycle, and directly benefit the dozens of Splash chapters and thousands of students who rely on the ESP Website.

Difficulty: Hard | Expected size: 350 hours (Large) | Possible mentors: Miles Calabresi, William Gearty






About Me
Name: Samar Yadav & GitHub: samar-703


University / Program / Year / Expected Graduation: University of Mumbai · B.E. in Electronics and Telecommunication Engineering · Final Year · Expected graduation 2026


Contact info:


Email: hello.samar7@gmail.com
LinkedIn: linkedin.com/in/samar-yadav-50910124b
X (formerly Twitter): x.com/0xSamar
Phone: +91 9607868197
Timezone: IST (UTC +5:30)
Resume: https://samarrr.me/
 
Summary of key skills below:
Domain
Technologies
Languages
TypeScript, JavaScript, Python, Go, Rust
Backend
Django, FastAPI, Express, TRPC, Next.js
Frontend
React, Next.js, plain HTML/CSS/JavaScript
Data & Viz
Plotly, D3.js, Streamlit, Dash, NumPy, pandas
DevOps
Docker, Docker Compose, GitHub Actions, Vercel, GCP
Testing
pytest, Jest, Django TestCase, CI pipelines
Version Control
Git, GitHub, feature branches, PR-based reviews

I'm tech-stack agnostic, I pick up whatever the project needs. The ESP Website is a Django app (Python backend, Django templates, JavaScript frontend, SendGrid for email), which maps directly to my daily work.


Code Contribution
Merged PRs: Jaeger UI (CNCF)
PR #3473 Jaeger UI: Fixed a bug where TraceDiff slot B search was incorrectly populating slot A, breaking trace comparison workflows. Identified the root cause in state management, wrote a targeted fix with regression tests.


PR #3485 Jaeger UI: Normalized uppercase trace IDs to lowercase in URLs, fixing inconsistent routing behavior. 

Open PRs: google-gemini/gemini-cli
PR #22798 gemini-cli: Comprehensive ACP test suite for the extensions command system: ExtensionsCommand delegation, list/explore, enable/disable, install/link, uninstall/restart/update, and MCP auto-enable behavior. Labeled priority/p1.


PR #23400 gemini-cli: Unit test coverage for ACP restore commands, RestoreCommand and ListCheckpointsCommand delegation, checkpointing-disabled responses, schema validation, restore stream formatting, error handling.
PR #24152 gemini-cli: Input queuing during history compression:keeps the composer active while compression is pending, queues plain-text prompts for automatic submission post-compression, and blocks slash/shell commands from being queued mid-compression. Includes UI and hook test coverage across AppContainer and useMessageQueue.


Core Contributor at Akatsuki AI Technologies (aitf-inc)
141 contributions to the AITF security monitoring dashboard. Key work: implemented i18n across the frontend, integrated Gemini API for AI-driven security alert explanations, added Google OAuth, redesigned the dashboard UI with stat cards and interactive charts, implemented security simulation flow with backend endpoints and real-time notifications.
Other Open Source
Contributions to OpenCost, OpenLibrary, and Cal.com, data visualization, documentation, backend integrations, and testing infrastructure across multiple codebases and stacks.
In cal.com, I built a feature of round-robin scheduling, fixed one calendar invite issue, and made one small UI fix of the onboarding modal.
Relevant Personal Projects
Knox (AI coding agent): Built an AI coding agent in TypeScript that manages context windows, orchestrates tool calls, handles streaming responses, and integrates with the local filesystem. One of the most architecturally complex systems I've built from scratch.


VoxPilot (AI voice assistant): TypeScript voice assistant,  processes speech, determines intent, executes structured tool calls. Deepened my understanding of building reliable data transformation pipelines. Link
Layer-Zero (Bitcoin architecture): Educational TypeScript project exploring Bitcoin's transactions, UTXO model, cryptographic primitives, and consensus rules from the ground up. Link


Cider (real-time video chat): Omegle-style video chat with JavaScript and WebSockets. Real-time communication, bidirectional streaming, async state management across clients. Link




ESP-Website Contribution (Planned)
I will submit a PR directly to the learning-unlimited/ESP-Website repository before the application deadline to demonstrate familiarity with the Django codebase and the comm panel module. I am reviewing open issues labeled "GSoC 2026" to identify the best contribution.


Project Information
1. Project Abstract
The ESP Website's comm panel lets administrators email students, teachers, and parents. While functional, it lacks three features that modern email tools provide: reusable HTML email templates, scheduled sending, and teacher-facing access. This project adds all three.
Deliverable A: Email Template System: A Django model for storing reusable HTML email templates with variable placeholders ({{program_name}}, {{student_name}}, etc.), a management interface for creating/editing/duplicating/deleting templates, a template selector in the comm panel with live preview thumbnails, a variable substitution engine that resolves placeholders at send time, and 3–4 production-ready starter templates (announcement, reminder, newsletter, alert) with inline CSS for email client compatibility.HTML bodies are sanitized before rendering to prevent XSS from user-provided template content. Addresses Issue #2885.
Deliverable B: Scheduled Email Sending: A scheduled_send_time field and status state machine (draft → scheduled → sending → sent → failed → cancelled) added to the email model. A date/time picker (Flatpickr) in the comm panel with a "Schedule for later" toggle. SendGrid integration via the send_at API parameter (primary path). A cron-based fallback via a process_scheduled_emails Django management command for non-SendGrid deployments or emails beyond SendGrid's 72-hour limit. A pending emails dashboard with cancel and reschedule actions. Addresses Issue #3951.

Deliverable C: Teacher Comm Panel: A simplified comm panel view accessible to users with the Teacher role. A class selector dropdown scoped to the teacher's own classes. Server-side recipient scoping (teachers can only email their own enrolled students - no client-side filtering). Read-only access to admin-created templates. Rate limiting (configurable per program). Program-level enable/disable toggle. A standard footer identifying the sending teacher. Full audit trail visible to admins. Addresses Issue #3833.


2. Detailed Description
Background
Learning Unlimited is a nonprofit supporting volunteer-run educational programs, most notably "Splash," where college students teach short classes to middle and high schoolers. The ESP Website is the open-source Django application that powers program logistics: registration, scheduling, and email communications. It has 11,935+ commits, 66 contributors, and serves dozens of Splash chapters reaching thousands of students annually.
The comm panel is how admins send emails. Today it supports selecting recipients, writing a subject/body with basic HTML, and sending immediately via SendGrid. Three long-standing feature requests, all labeled "GSoC 2026", motivate this project:
Issue #2885 (Jan 2020): Admins at SplashCon 2020 requested MailChimp-style template selection.
Issue #3951 (Nov 2025): Request for scheduled sending. Note that SendGrid's API supports it natively.
Issue #3833 (Apr 2025): Proposal for a teacher comm panel to email enrolled students.
Splash programs are time-sensitive, high-coordination events involving dozens of emails per cycle. Templates eliminate repetitive formatting. Scheduling eliminates timing dependencies. A teacher comm panel eliminates the admin bottleneck. Together, they transform the comm panel into a modern communications tool.









Deliverable A: Email Template System (Detail)
Data model : EmailTemplate:

Field
Type
Description
name
CharField(max_length=200)
Human-readable template name
description
TextField(blank=True)
When to use this template
subject_template
CharField(max_length=500)
Subject line with variable placeholders
html_body
TextField
Full HTML body with variable placeholders
thumbnail
ImageField(blank=True)
Preview thumbnail for selection UI
program
ForeignKey(Program, null=True)
Scoped to a program; null = global
created_by
ForeignKey(ESPUser)
Creator
created_at
DateTimeField(auto_now_add)
Created
updated_at
DateTimeField(auto_now)
Last modified

Management views: Full CRUD, list (filterable by program, sortable), create/edit (with HTML editor and live preview pane), duplicate (one-click copy), delete (soft delete with confirmation). All views protected by ESP's admin permission decorators.
Comm panel integration: A template selector (grid or dropdown with thumbnails) at the top of the existing comm panel form. Clicking a template populates the subject and body fields. A live preview pane renders the email via <iframe srcdoc>. A "Clear template" button resets to blank. Template selection is optional, the existing workflow is untouched.
Variable substitution: Placeholders like {{program_name}}, {{student_name}}, {{class_title}} are resolved at send time using Django's template engine, hooking into the existing email context. Unresolved variables render as empty strings with a logged warning.
Starter templates: 3-4 production-ready templates ship with the feature: Program Announcement, Schedule Reminder, Newsletter/Update, Urgent/Alert. All use inline CSS tested against Gmail, Outlook, Apple Mail, Yahoo Mail.


Deliverable B: Scheduled Email Sending (Detail)!
[state-machine-2.png](state-machine-2.png)
Database changes: Two new fields on the existing email model:
Field
Type
Description
scheduled_send_time
DateTimeField(null=True, blank=True)
When to send; null = immediate
status
CharField(choices=[...])
draft / scheduled / sending / sent / failed / cancelled



Scheduling UI: Flatpickr date/time picker (~16KB, dependency-free, accessible). Appears as an optional "Schedule for later" toggle below the send button. When toggled on: date picker + time picker + timezone display + future-time validation + button label changes to "Schedule Send". When off (default): sends immediately, zero change to existing workflow.
SendGrid integration (primary): SendGrid v3 mail/send supports send_at (Unix timestamp, up to 72 hours ahead). When scheduled_send_time is set and within 72 hours, the email is passed to SendGrid with send_at. Status becomes "scheduled". Batch ID stored for cancellation.
Cron fallback: A Django management command process_scheduled_emails runs every 5 minutes via cron. Queries status='scheduled' and scheduled_send_time <= now(). Sends via an existing pipeline. Atomic status updates prevent duplicate sends. Also handles emails scheduled >72 hours out by passing them to SendGrid when they enter the 72-hour window.
Dashboard: A new admin view listing all scheduled/sending emails, subject, recipient count, scheduled time, status, and created by. Actions: cancel, reschedule. Filterable by status and date range.
Deliverable C: Teacher Comm Panel (Detail)
View: A simplified comm panel for users with the Teacher role. Class selector dropdown (teacher's classes for current program, or "All my classes"). Recipient count preview (no individual emails exposed). Subject/body fields with read-only template access. Sends via an existing pipeline.
Permissions: Server-side recipient scoping queryset built from teacher's class assignments, not bypassable client-side. Rate limiting (configurable max N emails/day/teacher, checked server-side). Program-level toggle (admins enable/disable per program). Standard email footer identifying the sending teacher.
Audit: All teacher emails logged alongside admin emails, filterable by sender type. Entries include teacher name, class(es) targeted, recipient count, and full content.
Integration: Teachers can use templates (read-only) and scheduling (if enabled). Scheduled teacher emails appear in the pending dashboard, labeled as teacher-initiated.







System Architecture (High-level)
![sys-arch-final.png](sys-arch-final.png)


Key design decisions:
No new frontend framework. Plain JavaScript + CSS, consistent with the existing codebase. No React/Vue introduced.
Flatpickr for date/time. Lightweight, dependency-free, accessible, customizable.
SendGrid-first, cron-fallback. Most reliable path since ESP already uses SendGrid. Cron ensures it works for any deployment.
Server-side scoping for teachers. Recipient lists built via Django ORM queries, no client-side filtering to bypass.
Django template engine for variables. Consistent with existing dynamic email content. No custom substitution engine.
New/modified models:
Model
Type
Purpose
EmailTemplate
New
Reusable templates with HTML body, subject, thumbnail, and program scoping
MessageRequest
Modified (new fields)
Add scheduled_send_time, status, sendgrid_batch_id, template FK
TeacherEmailRateLimit
New
Daily email count per teacher per program


1. Weekly Timeline
The coding period runs May 25 – August 18, 2026 (12 weeks). Community bonding: April 30 – May 25. Midterm: around July 14–18. Total: 350 hours (~29 hrs/week).
Community Bonding (April 30 – May 25)
Set up a local dev environment with Docker (docker compose up --build).
Deep-dive into esp/dbmail/, the email sending pipeline, SendGrid integration, and comm panel views/templates.
Read all discussions on issues #2885, #3951, #3833.
Review contributing guidelines, PR conventions, code style, test infrastructure.
Draft wireframes for template selector, scheduling UI, teacher comm panel. Iterate with mentors.
Agree on EmailTemplate model schema with mentors.
Study SendGrid v3 API docs for send_at and batch scheduling.
Submit a warm-up PR (bug fix or small improvement) to build familiarity with the contribution workflow.
Week 1 (May 25–31): Template Model & Migration - 30 hrs
Implement the EmailTemplate Django model (all fields: name, description, subject_template, html_body, thumbnail, program FK, created_by, timestamps). Write the database migration. Write comprehensive model tests: field validation, scoping behavior, creation/update, edge cases (empty body, duplicate names, null program for global templates).
Week 2 (Jun 1–7): Template CRUD Views - 30 hrs
Build template management views: list (filterable by program, sortable by name/date), create, edit, duplicate, delete. Django forms with validation and sanitization. Admin permission checks using ESP's decorators. Unit tests for all views: permission enforcement, form validation, CRUD operations, edge cases. URL routing is integrated with ESP's existing patterns.
Week 3 (Jun 8–14): Template Selection UI in Comm Panel - 30 hrs
Build the template selector in the existing comm panel: grid/dropdown of templates with thumbnail previews, click-to-populate (subject + body), live preview pane via <iframe srcdoc>, "Clear template" reset. JavaScript for template switching, AJAX-based loading, real-time preview rendering. Existing "write from scratch" workflow unchanged. Front-end tests.
Week 4 (Jun 15–21): Variable Substitution & Starter Templates - 30 hrs
Implement variable substitution engine (Django template rendering with existing email context). Create 3–4 starter templates with inline CSS, tested against Gmail/Outlook/Apple Mail/Yahoo. End-to-end test: select template → populate → preview → substitute → send → verify. Integration tests for the full template flow.
Week 5 (Jun 22–28): Scheduling: Data Layer & UI - 30 hrs
Add scheduled_send_time and status fields to the email model. Write migration. Integrate Flatpickr: "Schedule for later" toggle, date/time picker, timezone display, future-time validation, dynamic button label. Wire frontend to pass scheduled time to backend. Unit tests for new fields and form validation.
Week 6 (Jun 29–Jul 5): Scheduling: Backend & Dashboard - 30 hrs
Midterm point. Implement SendGrid scheduling (pass send_at to API). Implement cron fallback: process_scheduled_emails management command with atomic status updates. Build pending emails dashboard (list, cancel, reschedule). Tests for both paths (mock SendGrid, simulated cron runs, status transitions). By end of week 6: template system complete and working, scheduling functional via both paths, dashboard accessible. All with tests. This is ~60% of scope - enough for mentor evaluation.
Week 7 (Jul 6–12): Scheduling: Polish & Edge Cases - 28 hrs
Polish templates + scheduling based on mentor feedback from midterm review. Add cancel/reschedule to the dashboard. Handle edge cases: scheduling in the past, SendGrid API failures/retries, timezone issues, batch ID storage for cancellation, >72-hour scheduling. Improve error messages. Additional integration tests.
Week 8 (Jul 13–19): Teacher Comm Panel: Core View - 30 hrs
Build the teacher-facing view: simplified form, class selector dropdown (teacher's classes), recipient count preview, subject/body fields. Permission checks (Teacher role). Server-side recipient scoping via ORM queries against enrollment tables. Tests for view access and permission enforcement.
Week 9 (Jul 20–26): Teacher Comm Panel: Integration - 30 hrs
Wire teacher comm panel to existing send pipeline. Integrate read-only template access. Implement TeacherEmailRateLimit model and server-side rate limiting. Add program-level enable/disable setting. Add a standard email footer identifying the teacher. Tests for rate limiting, scoping, and template access.
Week 10 (Jul 27–Aug 2): Teacher Comm Panel: Audit & Scheduling - 30 hrs
Build audit trail: teacher emails logged alongside admin emails, filterable by sender type (teacher name, classes, recipient count, content). Integrate scheduling into the teacher panel. Comprehensive tests: permissions (can't email other teachers' students), rate limit enforcement, audit correctness, scheduling integration, program toggle. End-to-end teacher workflow test.
Week 11 (Aug 3–9): Code Freeze & Testing - 30 hrs
Code freeze. Final testing across all three deliverables. Bug fixes. Cross-browser testing (Chrome, Firefox, Safari, Edge). Accessibility review (keyboard nav, screen reader labels, ARIA). Test coverage review and gap-filling. Performance check on cron job with large email queues.
Week 12 / Final Week (Aug 10–18): Documentation & Submission - 32 hrs
Write admin docs: template creation guide, scheduling usage, teacher comm panel setup. Write developer docs: architecture overview, extending templates, adding scheduled task types, testing guide. Code cleanup. Ensure all PRs are review-ready and follow ESP conventions. Record a short demo video. Final project submission.
Total: 350 hours

Other Commitments
Academics: Final year at University of Mumbai. If any exams overlap with the coding period, I will front-load work during community bonding and maintain a timeline buffer. I'll communicate exam dates to mentors as soon as confirmed.


Weekly availability: 25–30 hours per week, Monday–Saturday, 10 AM – 10 PM IST.


Other GSoC applications: I am also applying to UN OICT / EAPD-DRB for a different project (cross-platform UI development and model integration). If accepted to both, I am happy to commit fully to whichever organization I am matched with. Both align with my skills and I will deliver excellent work for either. In the event of a tie, I'd prefer Learning Unlimited given the strong fit with my Django and full-stack background.


No other conflicts: No other jobs, weddings, travel, or major commitments planned for the summer.


Conclusion
The ESP Website's comm panel is functional but stuck in the past, where admins write HTML from scratch every cycle, can't schedule sends, and teachers have no direct way to reach their students. This project fixes all three with a template system, scheduled sending, and a teacher comm panel.
I chose this project because it sits exactly at the intersection of what I know and what I want to get better at: the Django backend work, email delivery systems, and building UIs that reduce real operational friction for real users. Learning Unlimited runs programs that serve thousands of students, and a better communication tooling directly affects how smoothly those programs run. That's the kind of impact that makes the work worth doing well.
I have the full 350 hours, a clear week-by-week plan, and the technical background to execute it. I'm genuinely excited to work with Miles and William, ship something the ESP community will actually use, and contribute to a codebase that's been built with care over more than a decade.

