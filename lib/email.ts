import type { TemplateRecord, WarningItem } from "@/lib/types";

export const defaultCustomSubject = "Boston Splash 2026 update for this week";

export const defaultCustomBody =
  "<h2>Boston Splash 2026</h2><p>Hello {{student_name}},</p><p>This draft shows the current ESP communications workflow with added template selection, queue-first scheduling, and richer preview controls.</p><p>Your current schedule window is <strong>{{schedule_window}}</strong>. Please review any changes before {{request_deadline}}.</p><p>Questions can go to {{support_email}}.</p><p>{{teacher_footer}}</p>";

export function applyTemplate(template: TemplateRecord) {
  return {
    subject: template.subjectTemplate,
    body: template.bodyTemplate
  };
}

export function renderVariables(source: string, variables: Record<string, string>) {
  return Object.entries(variables).reduce((output, [token, value]) => output.replaceAll(token, value), source);
}

export function computeWarnings(allWarnings: WarningItem[], body: string, scheduleEnabled: boolean, templateName: string | null) {
  return allWarnings.filter((warning) => {
    if (warning.id === "unresolved-variable") {
      return body.includes("{{room_change_link}}");
    }
    if (warning.id === "cross-program-link") {
      return body.includes("spark.learningu.org");
    }
    if (warning.id === "large-mailer") {
      return true;
    }
    if (warning.id === "guardian-contact") {
      return scheduleEnabled || Boolean(templateName);
    }
    return true;
  });
}
