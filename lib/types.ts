export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export type Program = {
  id: string;
  name: string;
  shortName: string;
  term: string;
  timezone: string;
  teacherMessagingEnabled: boolean;
};

export type User = {
  id: string;
  name: string;
  role: "admin" | "teacher" | "student" | "guardian";
  email: string;
  programId: string;
};

export type PreviewPersona = {
  id: "student" | "guardian" | "teacher";
  label: string;
  role: string;
  variables: Record<string, string>;
};

export type VariableGroup = {
  id: string;
  label: string;
  variables: Array<{
    token: string;
    description: string;
  }>;
};

export type TemplateRecord = {
  id: string;
  name: string;
  description: string;
  scope: "Global" | "Program-specific" | "Starter";
  tags: string[];
  lastEdited: string;
  author: string;
  variableCount: number;
  thumbnail: string;
  notes: string;
  subjectTemplate: string;
  bodyTemplate: string;
  programLabel?: string;
  duplicatedFrom?: string;
};

export type WarningItem = {
  id: string;
  title: string;
  tone: "warning" | "danger" | "info";
  description: string;
  condition: string;
};

export type DeliveryStrategy = {
  queueFirst: string;
  sendgrid: string;
  snapshot: string;
};

export type ScheduledStatus =
  | "draft"
  | "scheduled"
  | "processing"
  | "sent"
  | "failed"
  | "cancelled";

export type AuditEvent = {
  id: string;
  at: string;
  label: string;
  detail: string;
};

export type ScheduledEmail = {
  id: string;
  subject: string;
  sender: string;
  senderType: "Admin" | "Teacher";
  recipientCount: number;
  templateName: string;
  scheduledTime: string;
  createdAt: string;
  program: string;
  status: ScheduledStatus;
  sendgridOptimized: boolean;
  isPublic: boolean;
  previewSnippet: string;
  recipientSnapshot: string;
  createdBy: string;
  notes: string;
  deliveryStrategy: string;
  auditEvents: AuditEvent[];
  partialFailure?: string;
};

export type TeacherClass = {
  id: string;
  name: string;
  period: string;
  recipientCount: number;
};

export type ArchitectureBlock = {
  id: string;
  title: string;
  note: string;
  steps: string[];
};
