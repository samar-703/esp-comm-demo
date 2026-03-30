"use client";

import { useMemo, useState } from "react";
import { CalendarClock, ChevronDown, Eye, LayoutTemplate, MailCheck, Save, Send, Shield, TestTube2, Type, WandSparkles } from "lucide-react";
import { deliveryStrategy, previewPersonas, programs, templateRecords, variableGroups, warningCatalog } from "@/data/mock-data";
import { applyTemplate, computeWarnings, defaultCustomBody, defaultCustomSubject } from "@/lib/email";
import { DeliveryStrategyCard } from "@/components/delivery-strategy-card";
import { Modal } from "@/components/modal";
import { PreviewPane } from "@/components/preview-pane";
import { RecipientSummaryCard } from "@/components/recipient-summary-card";
import { VariablePicker } from "@/components/variable-picker";
import { WarningStack } from "@/components/warning-stack";
import { Badge, Button, InlineNote, PanelFrame, SectionHeading } from "@/components/ui";

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300"
    >
      {icon}
      {label}
    </button>
  );
}

export function AdminComposeDemo() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>("schedule-reminder");
  const initialTemplate = templateRecords.find((template) => template.id === "schedule-reminder");
  const [subject, setSubject] = useState(initialTemplate?.subjectTemplate ?? defaultCustomSubject);
  const [body, setBody] = useState(initialTemplate?.bodyTemplate ?? defaultCustomBody);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [scheduledAt, setScheduledAt] = useState("2026-04-02T08:00");
  const [activePersona, setActivePersona] = useState<"student" | "guardian" | "teacher">("student");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [templateChooserOpen, setTemplateChooserOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const selectedTemplate = templateRecords.find((template) => template.id === selectedTemplateId) ?? null;
  const warnings = useMemo(
    () => computeWarnings(warningCatalog, body, scheduleEnabled, selectedTemplate?.name ?? null),
    [body, scheduleEnabled, selectedTemplate]
  );

  const handleInsert = (token: string) => {
    setBody((current) => `${current}${current.endsWith("</p>") ? "" : " "}${token}`);
  };

  const handleTemplateUse = (templateId: string) => {
    const template = templateRecords.find((record) => record.id === templateId);
    if (!template) return;
    const next = applyTemplate(template);
    setSelectedTemplateId(template.id);
    setSubject(next.subject);
    setBody(next.body);
    setTemplateChooserOpen(false);
  };

  const clearTemplate = () => {
    setSelectedTemplateId(null);
    setSubject(defaultCustomSubject);
    setBody(defaultCustomBody);
  };

  return (
    <>
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Deliverable B centers queue-first scheduling"
          title="Admin Compose"
          description="This is the primary proposal screen: the current ESP communications panel modernized with reusable templates, richer preview, and first-class scheduling controls layered onto the existing MessageRequest queue."
          action={
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{programs[0].shortName}</Badge>
              <Badge tone="info">Sender: Priya Menon</Badge>
              <Badge>Auto-saved 15s ago</Badge>
            </div>
          }
        />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <div className="space-y-4">
            <RecipientSummaryCard />

            <PanelFrame title="Compose message" detail="Template selection is additive. Admins can still write a custom message from scratch.">
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Template selector</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Button tone="secondary" onClick={() => setTemplateChooserOpen(true)}>
                            <LayoutTemplate className="h-4 w-4" />
                            Choose template
                          </Button>
                          {selectedTemplate ? <Badge tone="accent">{selectedTemplate.name}</Badge> : <Badge>Custom content</Badge>}
                        </div>
                      </div>
                      <Button tone="ghost" onClick={clearTemplate}>
                        Clear template
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Current mode</div>
                    <div className="mt-2 text-sm font-semibold text-slate-900">{scheduleEnabled ? "Schedule for later" : "Send now"}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">Current ESP workflow stays intact unless scheduling is toggled on.</div>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Subject</span>
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400"
                  />
                </label>

                <div>
                  <div className="mb-2 text-sm font-medium text-slate-700">Body editor</div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white">
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 px-4 py-3">
                      <ToolbarButton icon={<Type className="h-3.5 w-3.5" />} label="Heading" />
                      <ToolbarButton icon={<WandSparkles className="h-3.5 w-3.5" />} label="Insert CTA" />
                      <ToolbarButton icon={<Eye className="h-3.5 w-3.5" />} label="Preview HTML" />
                      <ToolbarButton icon={<ChevronDown className="h-3.5 w-3.5" />} label="More tools" />
                    </div>
                    <textarea
                      value={body}
                      onChange={(event) => setBody(event.target.value)}
                      className="min-h-[320px] w-full resize-none rounded-b-[1.5rem] border-0 bg-white px-4 py-4 text-sm leading-7 text-slate-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setTestModalOpen(true)}
                    className="flex items-start gap-3 rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-slate-300"
                  >
                    <TestTube2 className="mt-1 h-4 w-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Send test email</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Preview the rendered email in Priya’s inbox before queueing the real job.</p>
                    </div>
                  </button>

                  <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Make public</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">Visible as a public-facing program communication in the audit trail.</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPublic((value) => !value)}
                        className={`relative h-7 w-12 rounded-full transition ${isPublic ? "bg-teal-700" : "bg-slate-300"}`}
                        aria-pressed={isPublic}
                      >
                        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${isPublic ? "left-6" : "left-1"}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/85 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Schedule for later</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">This proposal surfaces scheduling explicitly on top of the current queue-based delivery model.</div>
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
                    <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Scheduled time</span>
                        <input
                          type="datetime-local"
                          value={scheduledAt}
                          onChange={(event) => setScheduledAt(event.target.value)}
                          className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400"
                        />
                        <div className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500">Timezone: {programs[0].timezone}</div>
                        <div className="mt-2 text-sm text-slate-600">Recipients are frozen now, then released into the queue at the scheduled time.</div>
                      </label>
                      <div className="rounded-[1.4rem] border border-blue-200 bg-blue-50 px-4 py-4">
                        <div className="text-xs uppercase tracking-[0.16em] text-blue-700">Validation</div>
                        <p className="mt-2 text-sm leading-6 text-blue-900">
                          Future time selected. If the deployment supports it, provider optimization can be attached later without changing the UX.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <InlineNote>
                  Architecture note: the proposed scheduling UX creates or updates a <strong>MessageRequest</strong>, then leaves actual delivery to the existing queue and <strong>TextOfEmail</strong> expansion path.
                </InlineNote>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Save className="h-4 w-4" />
                    Save state synced to draft mock
                  </div>
                  <Button onClick={() => setConfirmModalOpen(true)}>
                    {scheduleEnabled ? <CalendarClock className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    {scheduleEnabled ? "Schedule send" : "Send now"}
                  </Button>
                </div>
              </div>
            </PanelFrame>

            <VariablePicker groups={variableGroups} onInsert={handleInsert} />
          </div>

          <div className="space-y-4">
            <PreviewPane
              personas={previewPersonas}
              activePersona={activePersona}
              onPersonaChange={setActivePersona}
              device={device}
              onDeviceChange={setDevice}
              subject={subject}
              body={body}
            />
            <PanelFrame title="Warnings" detail="Warnings update from mocked conditions so reviewers can see how the product would guide safer sends.">
              <WarningStack warnings={warnings} />
            </PanelFrame>
            <DeliveryStrategyCard strategy={deliveryStrategy} />
            <PanelFrame title="Architecture note" detail="Built on MessageRequest / TextOfEmail queue.">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <Shield className="mt-0.5 h-4 w-4 text-slate-700" />
                <p className="text-sm leading-6 text-slate-700">
                  The UI introduces templates, scheduling, and better audit context without replacing the current ESP delivery architecture. Queue creation remains the source of truth.
                </p>
              </div>
            </PanelFrame>
          </div>
        </div>
      </div>

      <Modal open={templateChooserOpen} onClose={() => setTemplateChooserOpen(false)} title="Choose template" description="Starter templates and saved program templates populate the current compose form.">
        <div className="space-y-3">
          {templateRecords.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplateUse(template.id)}
              className="flex w-full items-start justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-teal-300 hover:bg-teal-50/70"
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">{template.name}</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">{template.description}</div>
              </div>
              <Badge tone={template.scope === "Starter" ? "accent" : template.scope === "Global" ? "info" : "warning"}>{template.scope}</Badge>
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={testModalOpen} onClose={() => setTestModalOpen(false)} title="Send test email" description="This mock confirms a test message to the current admin only.">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-sm font-semibold text-slate-900">Priya Menon</div>
            <div className="mt-1 text-sm text-slate-600">priya@esp.example</div>
            <div className="mt-3 text-sm text-slate-700">The test message uses the currently selected preview rendering and does not create a queued job.</div>
          </div>
          <div className="flex justify-end gap-2">
            <Button tone="ghost" onClick={() => setTestModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setTestModalOpen(false)}>
              <MailCheck className="h-4 w-4" />
              Confirm test send
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title={scheduleEnabled ? "Confirm scheduled send" : "Confirm send"}
        description="This confirmation keeps the queue-first model explicit before release."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Template", selectedTemplate?.name ?? "Custom content"],
            ["Recipient count", "1,248"],
            ["Scheduled time", scheduleEnabled ? new Date(scheduledAt).toLocaleString() : "Immediate release"],
            ["Timezone", programs[0].timezone],
            ["Sender type", "Admin"],
            ["Delivery strategy", "Queue-first scheduling"],
            ["Visibility", isPublic ? "Public" : "Non-public"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
              <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm leading-6 text-blue-900">
          Recipients frozen now. Built on MessageRequest / TextOfEmail queue, with provider optimization remaining optional.
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="ghost" onClick={() => setConfirmModalOpen(false)}>
            Review draft
          </Button>
          <Button onClick={() => setConfirmModalOpen(false)}>
            {scheduleEnabled ? "Queue scheduled job" : "Create and send"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
