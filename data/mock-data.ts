import type {
  ArchitectureBlock,
  DeliveryStrategy,
  NavItem,
  PreviewPersona,
  Program,
  ScheduledEmail,
  TeacherClass,
  TemplateRecord,
  User,
  VariableGroup,
  WarningItem
} from "@/lib/types";

export const navItems: NavItem[] = [
  { href: "/", label: "Overview", description: "Current vs proposed comm system" },
  { href: "/admin/compose", label: "Admin Compose", description: "Primary upgraded compose flow" },
  { href: "/admin/templates", label: "Templates", description: "Reusable template library" },
  { href: "/admin/scheduled", label: "Scheduled", description: "Queue-first scheduling dashboard" },
  { href: "/teacher/compose", label: "Teacher Panel", description: "Scoped teacher messaging flow" },
  { href: "/architecture", label: "Architecture", description: "Technical flow mapping" }
];

export const programs: Program[] = [
  {
    id: "splash-boston",
    name: "Boston Splash 2026",
    shortName: "Splash Boston",
    term: "Spring 2026",
    timezone: "America/New_York",
    teacherMessagingEnabled: true
  },
  {
    id: "spark-cambridge",
    name: "Cambridge Spark 2026",
    shortName: "Spark Cambridge",
    term: "Summer 2026",
    timezone: "America/New_York",
    teacherMessagingEnabled: false
  }
];

export const users: User[] = [
  {
    id: "admin-1",
    name: "Priya Menon",
    role: "admin",
    email: "priya@esp.example",
    programId: "splash-boston"
  },
  {
    id: "teacher-1",
    name: "Diego Alvarez",
    role: "teacher",
    email: "diego@esp.example",
    programId: "splash-boston"
  },
  {
    id: "student-1",
    name: "Avery Kim",
    role: "student",
    email: "avery@student.example",
    programId: "splash-boston"
  },
  {
    id: "guardian-1",
    name: "Jordan Kim",
    role: "guardian",
    email: "jordan.guardian@example",
    programId: "splash-boston"
  }
];

export const previewPersonas: PreviewPersona[] = [
  {
    id: "student",
    label: "Student",
    role: "Student preview",
    variables: {
      "{{student_name}}": "Avery Kim",
      "{{guardian_name}}": "Jordan Kim",
      "{{program_name}}": "Boston Splash 2026",
      "{{class_title}}": "Designing Small Satellites",
      "{{schedule_window}}": "Saturday, April 13 from 9:00 AM to 3:30 PM",
      "{{request_deadline}}": "April 9 at 11:59 PM",
      "{{teacher_name}}": "Diego Alvarez",
      "{{support_email}}": "splash@esp.example",
      "{{teacher_footer}}": "Sent by Diego Alvarez for Design and Engineering Studio."
    }
  },
  {
    id: "guardian",
    label: "Guardian",
    role: "Guardian preview",
    variables: {
      "{{student_name}}": "Avery Kim",
      "{{guardian_name}}": "Jordan Kim",
      "{{program_name}}": "Boston Splash 2026",
      "{{class_title}}": "Designing Small Satellites",
      "{{schedule_window}}": "Saturday, April 13 from 9:00 AM to 3:30 PM",
      "{{request_deadline}}": "April 9 at 11:59 PM",
      "{{teacher_name}}": "Diego Alvarez",
      "{{support_email}}": "parents@esp.example",
      "{{teacher_footer}}": "Sent by Diego Alvarez on behalf of the program team."
    }
  },
  {
    id: "teacher",
    label: "Teacher",
    role: "Teacher preview",
    variables: {
      "{{student_name}}": "Avery Kim",
      "{{guardian_name}}": "Jordan Kim",
      "{{program_name}}": "Boston Splash 2026",
      "{{class_title}}": "Designing Small Satellites",
      "{{schedule_window}}": "Saturday, April 13 from 9:00 AM to 3:30 PM",
      "{{request_deadline}}": "April 9 at 11:59 PM",
      "{{teacher_name}}": "Diego Alvarez",
      "{{support_email}}": "teacher-support@esp.example",
      "{{teacher_footer}}": "Sent by Diego Alvarez, teacher for Designing Small Satellites."
    }
  }
];

export const variableGroups: VariableGroup[] = [
  {
    id: "user",
    label: "User",
    variables: [
      { token: "{{student_name}}", description: "Current student first and last name" },
      { token: "{{guardian_name}}", description: "Primary guardian name" },
      { token: "{{teacher_name}}", description: "Teacher display name" }
    ]
  },
  {
    id: "program",
    label: "Program",
    variables: [
      { token: "{{program_name}}", description: "Program title" },
      { token: "{{support_email}}", description: "Program support inbox" }
    ]
  },
  {
    id: "request",
    label: "Request",
    variables: [
      { token: "{{request_deadline}}", description: "Latest reply / action deadline" }
    ]
  },
  {
    id: "schedule",
    label: "Schedule / roster",
    variables: [
      { token: "{{class_title}}", description: "Class or roster name" },
      { token: "{{schedule_window}}", description: "Rendered schedule block" },
      { token: "{{teacher_footer}}", description: "Teacher attribution footer" }
    ]
  }
];

export const templateRecords: TemplateRecord[] = [
  {
    id: "program-announcement",
    name: "Program Announcement",
    description: "High-clarity announcement for all active recipients with program links and policy notes.",
    scope: "Starter",
    tags: ["Launch", "All recipients", "HTML"],
    lastEdited: "2026-03-24T16:30:00Z",
    author: "ESP Core Team",
    variableCount: 5,
    thumbnail: "Two-column intro with CTA and logistics callout",
    notes: "Use when announcing registration opens, deadlines shift, or policy changes land.",
    subjectTemplate: "{{program_name}} update: key details for this week",
    bodyTemplate:
      "<h1>{{program_name}}</h1><p>Hello {{student_name}},</p><p>We have an important update for your upcoming program day. Review the latest timing, links, and next steps below.</p><p><strong>Schedule:</strong> {{schedule_window}}</p><p>Questions can go to {{support_email}}.</p>",
    duplicatedFrom: "Starter pack"
  },
  {
    id: "schedule-reminder",
    name: "Schedule Reminder",
    description: "Reminder email for program-day logistics, arrival windows, and class details.",
    scope: "Starter",
    tags: ["Reminder", "Roster", "Morning of"],
    lastEdited: "2026-03-28T11:20:00Z",
    author: "Priya Menon",
    variableCount: 6,
    thumbnail: "Compact schedule summary with badge row",
    notes: "Best when exact timing matters and the audience may include guardians.",
    subjectTemplate: "Reminder for {{program_name}}: your schedule is ready",
    bodyTemplate:
      "<h2>Your {{program_name}} schedule</h2><p>Hi {{student_name}},</p><p>You are scheduled for <strong>{{class_title}}</strong>.</p><p>Your arrival window is {{schedule_window}}. Please review any updates before {{request_deadline}}.</p><p>Reply to {{support_email}} if you need help.</p>"
  },
  {
    id: "newsletter-update",
    name: "Newsletter / Update",
    description: "Flexible digest layout for multi-section program news and timeline recaps.",
    scope: "Global",
    tags: ["Digest", "Reusable", "Program-wide"],
    lastEdited: "2026-03-26T15:15:00Z",
    author: "Miles Calabresi",
    variableCount: 4,
    thumbnail: "Stacked sections with muted headlines",
    notes: "Use for weekly recaps, planning notes, or condensed family updates.",
    subjectTemplate: "{{program_name}} weekly digest",
    bodyTemplate:
      "<h2>{{program_name}} weekly digest</h2><p>Hello {{guardian_name}},</p><p>Here is this week's update for {{student_name}}. The main class focus is {{class_title}}, and the next deadline is {{request_deadline}}.</p><p>Questions: {{support_email}}</p>",
    programLabel: "All programs"
  },
  {
    id: "urgent-alert",
    name: "Urgent Alert",
    description: "High-visibility urgent change template with bold visual hierarchy and short body copy.",
    scope: "Starter",
    tags: ["Urgent", "Time-sensitive", "SMS-like"],
    lastEdited: "2026-03-30T07:00:00Z",
    author: "ESP Core Team",
    variableCount: 3,
    thumbnail: "Urgent banner with condensed body copy",
    notes: "Reserved for room changes, closures, or urgent policy communication.",
    subjectTemplate: "Urgent: {{program_name}} update",
    bodyTemplate:
      "<h2>Urgent program update</h2><p>{{student_name}}, please review this immediate update for {{program_name}}.</p><p>Support contact: {{support_email}}</p>"
  },
  {
    id: "teacher-office-hours",
    name: "Teacher Office Hours",
    description: "Program-specific teacher-facing template with room notes and attribution footer.",
    scope: "Program-specific",
    tags: ["Teacher", "Scoped", "Class-specific"],
    lastEdited: "2026-03-27T09:45:00Z",
    author: "Diego Alvarez",
    variableCount: 5,
    thumbnail: "Single column classroom note with footer",
    notes: "Use only when teachers are allowed to contact enrolled students for class updates.",
    subjectTemplate: "{{class_title}} office hours update",
    bodyTemplate:
      "<h2>{{class_title}}</h2><p>Hi {{student_name}},</p><p>Office hours are being adjusted for this week. Please review the latest details before {{request_deadline}}.</p><p>{{teacher_footer}}</p>",
    programLabel: "Boston Splash 2026"
  }
];

export const templateFilters = ["All", "Global", "Program-specific", "Starter templates", "Recently edited"];

export const warningCatalog: WarningItem[] = [
  {
    id: "large-mailer",
    title: "Large mailer",
    tone: "warning",
    description: "1,248 recipients means the MessageRequest will expand into a large TextOfEmail batch.",
    condition: "Triggered when recipient count exceeds 500."
  },
  {
    id: "guardian-contact",
    title: "Guardians and emergency contacts included",
    tone: "warning",
    description: "Double-check tone and links before release because family contacts are in scope.",
    condition: "Shown when the selected list includes guardians or emergency contacts."
  },
  {
    id: "unresolved-variable",
    title: "Unresolved variable",
    tone: "danger",
    description: "The token {{room_change_link}} is not available in current preview data and would render blank.",
    condition: "Shown when the editor contains a token outside the approved variable set."
  },
  {
    id: "cross-program-link",
    title: "Cross-program link",
    tone: "info",
    description: "Preview detected a link pointing to a different program slug than the current MessageRequest context.",
    condition: "Shown when a URL appears mismatched with the selected program."
  }
];

export const deliveryStrategy: DeliveryStrategy = {
  queueFirst: "Create MessageRequest immediately, freeze recipients now, and release into the queue at the scheduled time.",
  sendgrid: "Use SendGrid scheduling only as an optimization when the deployment supports it and the job fits that window.",
  snapshot: "Recipient snapshot is captured at schedule time to keep auditability aligned with the existing queue model."
};

export const scheduledEmails: ScheduledEmail[] = [
  {
    id: "job-001",
    subject: "Reminder for Boston Splash 2026: your schedule is ready",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 1248,
    templateName: "Schedule Reminder",
    scheduledTime: "2026-04-02T12:00:00Z",
    createdAt: "2026-03-29T18:45:00Z",
    program: "Boston Splash 2026",
    status: "scheduled",
    sendgridOptimized: false,
    isPublic: true,
    previewSnippet: "Your arrival window is Saturday, April 13 from 9:00 AM to 3:30 PM...",
    recipientSnapshot: "Students, guardians, emergency contacts locked from Splash Boston roster v18.",
    createdBy: "Priya Menon",
    notes: "Queue-first scheduling with guardian-safe copy.",
    deliveryStrategy: "Queue-first scheduling",
    auditEvents: [
      {
        id: "a1",
        at: "2026-03-29T18:45:00Z",
        label: "Draft saved",
        detail: "Draft created from Schedule Reminder starter template."
      },
      {
        id: "a2",
        at: "2026-03-29T18:49:00Z",
        label: "Scheduled",
        detail: "Recipients frozen and queued for 2026-04-02 12:00 UTC."
      }
    ]
  },
  {
    id: "job-002",
    subject: "Urgent: Boston Splash 2026 update",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 97,
    templateName: "Urgent Alert",
    scheduledTime: "2026-03-30T09:10:00Z",
    createdAt: "2026-03-30T08:45:00Z",
    program: "Boston Splash 2026",
    status: "processing",
    sendgridOptimized: true,
    isPublic: false,
    previewSnippet: "Please review this immediate update for Boston Splash 2026...",
    recipientSnapshot: "Students in room-change cohort; no guardians included.",
    createdBy: "Priya Menon",
    notes: "SendGrid optimization active because this release is inside the provider window.",
    deliveryStrategy: "Queue release + SendGrid optimization",
    auditEvents: [
      {
        id: "b1",
        at: "2026-03-30T08:45:00Z",
        label: "Queued",
        detail: "Immediate release initiated from admin compose."
      },
      {
        id: "b2",
        at: "2026-03-30T09:10:00Z",
        label: "Processing",
        detail: "Cron handoff and provider dispatch started."
      }
    ]
  },
  {
    id: "job-003",
    subject: "Boston Splash 2026 weekly digest",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 388,
    templateName: "Newsletter / Update",
    scheduledTime: "2026-03-28T15:00:00Z",
    createdAt: "2026-03-27T21:00:00Z",
    program: "Boston Splash 2026",
    status: "sent",
    sendgridOptimized: false,
    isPublic: true,
    previewSnippet: "Here is this week's update for Avery Kim...",
    recipientSnapshot: "Students + guardians snapshot from roster v17.",
    createdBy: "Priya Menon",
    notes: "Sent via normal queue expansion.",
    deliveryStrategy: "Queue-first scheduling",
    auditEvents: [
      {
        id: "c1",
        at: "2026-03-27T21:00:00Z",
        label: "Scheduled",
        detail: "Prepared in advance for weekend release."
      },
      {
        id: "c2",
        at: "2026-03-28T15:04:00Z",
        label: "Sent",
        detail: "All messages marked sent after TextOfEmail expansion."
      }
    ]
  },
  {
    id: "job-004",
    subject: "Designing Small Satellites office hours update",
    sender: "Diego Alvarez",
    senderType: "Teacher",
    recipientCount: 42,
    templateName: "Teacher Office Hours",
    scheduledTime: "2026-04-01T14:30:00Z",
    createdAt: "2026-03-30T06:10:00Z",
    program: "Boston Splash 2026",
    status: "scheduled",
    sendgridOptimized: false,
    isPublic: false,
    previewSnippet: "Office hours are being adjusted for this week...",
    recipientSnapshot: "Students enrolled in Diego Alvarez classes; classes selected at schedule time.",
    createdBy: "Diego Alvarez",
    notes: "Teacher-initiated email remains visible in the shared audit dashboard.",
    deliveryStrategy: "Teacher scope + queue-first scheduling",
    auditEvents: [
      {
        id: "d1",
        at: "2026-03-30T06:10:00Z",
        label: "Teacher draft",
        detail: "Created from approved read-only template."
      },
      {
        id: "d2",
        at: "2026-03-30T06:16:00Z",
        label: "Scheduled",
        detail: "Recipients frozen from teacher class roster snapshot."
      }
    ]
  },
  {
    id: "job-005",
    subject: "Reminder for Boston Splash 2026: your schedule is ready",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 612,
    templateName: "Schedule Reminder",
    scheduledTime: "2026-03-31T10:00:00Z",
    createdAt: "2026-03-29T10:40:00Z",
    program: "Boston Splash 2026",
    status: "failed",
    sendgridOptimized: true,
    isPublic: true,
    previewSnippet: "Arrival window details included for all students in Sunday cohort...",
    recipientSnapshot: "Roster v16; guardians included.",
    createdBy: "Priya Menon",
    notes: "Partial delivery failure caused by rejected guardian aliases.",
    deliveryStrategy: "Queue release + provider retry",
    partialFailure: "47 guardian aliases bounced while 565 messages were accepted.",
    auditEvents: [
      {
        id: "e1",
        at: "2026-03-29T10:40:00Z",
        label: "Scheduled",
        detail: "Job prepared with provider optimization."
      },
      {
        id: "e2",
        at: "2026-03-31T10:07:00Z",
        label: "Failed",
        detail: "Partial provider failure logged; retry required."
      }
    ]
  },
  {
    id: "job-006",
    subject: "Draft follow-up for registration waitlist",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 204,
    templateName: "Program Announcement",
    scheduledTime: "2026-04-03T12:30:00Z",
    createdAt: "2026-03-30T05:20:00Z",
    program: "Boston Splash 2026",
    status: "draft",
    sendgridOptimized: false,
    isPublic: false,
    previewSnippet: "We have an important update for your upcoming program day...",
    recipientSnapshot: "Recipient list not frozen yet because this is still a draft.",
    createdBy: "Priya Menon",
    notes: "Draft waiting on final copy review.",
    deliveryStrategy: "Pending draft",
    auditEvents: [
      {
        id: "f1",
        at: "2026-03-30T05:20:00Z",
        label: "Draft saved",
        detail: "Not yet released into queue."
      }
    ]
  },
  {
    id: "job-007",
    subject: "Urgent: Boston Splash 2026 update",
    sender: "Priya Menon",
    senderType: "Admin",
    recipientCount: 81,
    templateName: "Urgent Alert",
    scheduledTime: "2026-03-30T04:00:00Z",
    createdAt: "2026-03-30T03:40:00Z",
    program: "Boston Splash 2026",
    status: "cancelled",
    sendgridOptimized: false,
    isPublic: false,
    previewSnippet: "Cancelled before queue release because room assignments changed again.",
    recipientSnapshot: "Initial student-only recipient snapshot retained for audit.",
    createdBy: "Priya Menon",
    notes: "Cancelled after program staff changed the source list.",
    deliveryStrategy: "Queue-first scheduling",
    auditEvents: [
      {
        id: "g1",
        at: "2026-03-30T03:40:00Z",
        label: "Scheduled",
        detail: "Initial room change alert prepared."
      },
      {
        id: "g2",
        at: "2026-03-30T03:51:00Z",
        label: "Cancelled",
        detail: "Admin cancelled before queue release."
      }
    ]
  }
];

export const teacherClasses: TeacherClass[] = [
  { id: "class-astro", name: "Designing Small Satellites", period: "9:00 AM", recipientCount: 24 },
  { id: "class-data", name: "Data Stories with Maps", period: "11:00 AM", recipientCount: 18 }
];

export const architectureBlocks: ArchitectureBlock[] = [
  {
    id: "current",
    title: "Current flow",
    note: "Existing ESP comm panel already selects recipients, composes HTML, previews, and queues messages.",
    steps: ["Admin selects recipients", "Compose email", "Preview", "Create MessageRequest", "Cron expands to TextOfEmail", "Mail backend sends"]
  },
  {
    id: "proposed",
    title: "Proposed compose flow",
    note: "The proposal adds product-layer guidance on top of the current queue model rather than replacing it.",
    steps: ["Compose", "Template selection", "Preview", "Schedule / send", "Audit dashboard"]
  },
  {
    id: "template",
    title: "Template flow",
    note: "Templates become a reusable library, not a separate sending system.",
    steps: ["Open template library", "Choose starter or saved template", "Populate compose form", "Preview with sample recipients", "Send test / send / schedule"]
  },
  {
    id: "schedule",
    title: "Scheduling flow",
    note: "Queue-first scheduling keeps MessageRequest / TextOfEmail as the central mental model.",
    steps: ["Compose", "Choose send now or schedule", "Freeze recipients now", "Queue for future release", "Show in pending dashboard", "Cancel / reschedule / send complete"]
  },
  {
    id: "teacher",
    title: "Teacher scope flow",
    note: "Teacher messaging is a new audited in-app workflow with constrained scope.",
    steps: ["Teacher selects own class", "Choose approved template or custom message", "View recipient count only", "Add schedule if enabled", "Message appears in shared audit dashboard"]
  }
];

export const architecturePipeline = {
  current: ["Admin Comm Panel", "MessageRequest", "cron", "TextOfEmail", "Mail Backend"],
  proposed: ["Compose", "Template Selection", "Preview", "Schedule / Send", "Audit Dashboard"]
};

export const overviewCards = [
  {
    href: "/admin/compose",
    title: "Admin Compose",
    detail: "Primary upgrade surface: template selection, variable insertion, preview personas, warnings, and scheduling flow."
  },
  {
    href: "/admin/templates",
    title: "Template Library",
    detail: "Reusable email templates with starter presets, search, preview, and duplicate/edit actions."
  },
  {
    href: "/admin/scheduled",
    title: "Scheduled Dashboard",
    detail: "Queue-first scheduling dashboard with status tracking, reschedule/cancel controls, and audit visibility."
  },
  {
    href: "/teacher/compose",
    title: "Teacher Comm Panel",
    detail: "New class-scoped teacher messaging flow with rate limits, safe recipient constraints, and no arbitrary filtering."
  },
  {
    href: "/architecture",
    title: "Architecture",
    detail: "Current and proposed diagrams showing how the UI layers onto MessageRequest and TextOfEmail."
  }
];
