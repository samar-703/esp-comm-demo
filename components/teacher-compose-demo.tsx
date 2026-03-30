"use client";

import { useMemo, useState } from "react";
import { CalendarClock, ShieldCheck, Users } from "lucide-react";
import { previewPersonas, teacherClasses, templateRecords, warningCatalog } from "@/data/mock-data";
import { computeWarnings } from "@/lib/email";
import { FooterAttributionPreview } from "@/components/footer-attribution-preview";
import { PreviewPane } from "@/components/preview-pane";
import { TeacherScopeCard } from "@/components/teacher-scope-card";
import { WarningStack } from "@/components/warning-stack";
import { Badge, Button, InlineNote, PanelFrame, SectionHeading } from "@/components/ui";

export function TeacherComposeDemo() {
  const teacherTemplates = templateRecords.filter((template) => template.scope === "Starter" || template.id === "teacher-office-hours");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState("teacher-office-hours");
  const [subject, setSubject] = useState("Designing Small Satellites office hours update");
  const [body, setBody] = useState(
    "<h2>{{class_title}}</h2><p>Hello {{student_name}},</p><p>I am sharing a quick update for this week. Please arrive prepared, and reach out if you have questions before {{request_deadline}}.</p><p>{{teacher_footer}}</p>"
  );
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [scheduledAt, setScheduledAt] = useState("2026-04-01T10:00");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const recipientCount = useMemo(() => {
    if (selectedClass === "all") return teacherClasses.reduce((sum, entry) => sum + entry.recipientCount, 0);
    return teacherClasses.find((entry) => entry.id === selectedClass)?.recipientCount ?? 0;
  }, [selectedClass]);

  const warnings = useMemo(
    () =>
      computeWarnings(
        warningCatalog.filter((warning) => warning.id !== "guardian-contact"),
        body,
        scheduleEnabled,
        selectedTemplateId
      ),
    [body, scheduleEnabled, selectedTemplateId]
  );

  return (
    <div className="space-y-4">
      <SectionHeading
        eyebrow="Deliverable C"
        title="Teacher Communications Panel"
        description="This mock shows the new teacher workflow as intentionally constrained: class-scoped sending, approved templates, visible rate limits, and shared admin auditability."
        action={
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Teacher messaging enabled</Badge>
            <Badge tone="info">2 of 5 messages sent today</Badge>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_400px]">
        <div className="space-y-4">
          <TeacherScopeCard />

          <PanelFrame title="Rate limit" detail="Program admins can keep teacher messaging safe with daily send caps and audit visibility.">
            <div className="rounded-[1.4rem] border border-blue-300 bg-blue-50 px-4 py-4 shadow-sm">
              <div className="text-xs uppercase tracking-[0.16em] text-blue-700">Teacher rate limit</div>
              <div className="mt-2 text-3xl font-semibold text-blue-950">2 of 5</div>
              <p className="mt-2 text-sm leading-6 text-blue-900">
                Messages sent today. Remaining sends apply only to the selected teacher and are enforced server-side in the real implementation.
              </p>
            </div>
          </PanelFrame>

          <PanelFrame title="Teacher compose" detail="Teachers can choose only from their own classes and approved templates. No arbitrary filtering, no admin settings.">
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Class selector</span>
                  <select
                    value={selectedClass}
                    onChange={(event) => setSelectedClass(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                  >
                    <option value="all">All my classes</option>
                    {teacherClasses.map((entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.name} · {entry.period}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="rounded-[1.2rem] border border-slate-300 bg-slate-50 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-4 w-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Recipient count preview</div>
                      <div className="mt-1 text-2xl font-semibold text-slate-950">{recipientCount}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">Only enrolled students in your selected classes.</div>
                    </div>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Approved template picker</span>
                <select
                  value={selectedTemplateId}
                  onChange={(event) => setSelectedTemplateId(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                >
                  {teacherTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} · read-only definition
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-sm text-slate-500">Teachers can use approved templates but cannot edit shared template definitions.</div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Subject</span>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Body editor mock</span>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  className="min-h-[260px] w-full rounded-[1.3rem] border border-slate-300 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </label>

              <div className="rounded-[1.4rem] border border-slate-300 bg-slate-100/90 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Optional schedule</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">Scheduling is visible only when teacher messaging is enabled by the program.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScheduleEnabled((value) => !value)}
                    className={`relative h-7 w-12 rounded-full transition ${scheduleEnabled ? "bg-slate-950" : "bg-slate-300"}`}
                    aria-pressed={scheduleEnabled}
                  >
                    <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${scheduleEnabled ? "left-6" : "left-1"}`} />
                  </button>
                </div>
                {scheduleEnabled ? (
                  <label className="mt-4 block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Scheduled time</span>
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(event) => setScheduledAt(event.target.value)}
                      className="w-full rounded-[1.2rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                  </label>
                ) : null}
              </div>

              <InlineNote>
                Teacher messages remain visible to admins in the shared audit dashboard, including class scope, recipient count, and final content.
              </InlineNote>

              <div className="flex justify-end">
                <Button>
                  <CalendarClock className="h-4 w-4" />
                  {scheduleEnabled ? "Schedule teacher send" : "Send to selected classes"}
                </Button>
              </div>
            </div>
          </PanelFrame>

          <FooterAttributionPreview />
        </div>

        <div className="space-y-4">
          <PanelFrame title="Teacher safety notes" detail="This panel explicitly communicates its restrictions and audit expectations.">
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-4">
                <ShieldCheck className="mt-1 h-4 w-4 text-teal-700" />
                <div>
                  <div className="text-sm font-semibold text-teal-950">Class-scoped sending only</div>
                  <p className="mt-1 text-sm leading-6 text-teal-800">Recipient selection is limited to the teacher’s own enrolled classes.</p>
                </div>
              </div>
              <WarningStack warnings={warnings} />
            </div>
          </PanelFrame>

          <PreviewPane
            personas={[previewPersonas[0]]}
            activePersona="student"
            onPersonaChange={() => undefined}
            device={device}
            onDeviceChange={setDevice}
            subject={subject}
            body={body}
          />
        </div>
      </div>
    </div>
  );
}
