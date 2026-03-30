"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ChevronDown, Send, RefreshCcw, Ban, Copy } from "lucide-react";
import type { ScheduledEmail, ScheduledStatus } from "@/lib/types";
import { AuditTimeline } from "@/components/audit-timeline";
import { CancelModal } from "@/components/cancel-modal";
import { RescheduleModal } from "@/components/reschedule-modal";
import { Badge, Button, PanelFrame } from "@/components/ui";
import { StatusPill } from "@/components/status-pill";

export function ScheduledTable({ initialJobs }: { initialJobs: ScheduledEmail[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeStatus, setActiveStatus] = useState<"all" | ScheduledStatus>("all");
  const [senderType, setSenderType] = useState("All senders");
  const [program, setProgram] = useState("All programs");
  const [template, setTemplate] = useState("Any template");
  const [expandedId, setExpandedId] = useState<string | null>(initialJobs[0]?.id ?? null);
  const [rescheduleJob, setRescheduleJob] = useState<ScheduledEmail | null>(null);
  const [cancelJob, setCancelJob] = useState<ScheduledEmail | null>(null);
  const [rescheduleValue, setRescheduleValue] = useState("2026-04-04T10:30");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const statusPass = activeStatus === "all" || job.status === activeStatus;
      const senderPass = senderType === "All senders" || job.senderType === senderType;
      const programPass = program === "All programs" || job.program === program;
      const templatePass = template === "Any template" || job.templateName === template;
      return statusPass && senderPass && programPass && templatePass;
    });
  }, [activeStatus, jobs, program, senderType, template]);

  const statuses: Array<"all" | ScheduledStatus> = ["all", "draft", "scheduled", "processing", "sent", "failed", "cancelled"];

  const confirmReschedule = () => {
    if (!rescheduleJob) return;
    setJobs((current) =>
      current.map((job) =>
        job.id === rescheduleJob.id
          ? {
              ...job,
              scheduledTime: new Date(rescheduleValue).toISOString(),
              status: "scheduled",
              auditEvents: [
                ...job.auditEvents,
                {
                  id: `${job.id}-rescheduled`,
                  at: new Date().toISOString(),
                  label: "Rescheduled",
                  detail: `Rescheduled in demo UI to ${format(new Date(rescheduleValue), "MMM d, yyyy h:mm a")}.`
                }
              ]
            }
          : job
      )
    );
    setRescheduleJob(null);
  };

  const confirmCancel = () => {
    if (!cancelJob) return;
    setJobs((current) =>
      current.map((job) =>
        job.id === cancelJob.id
          ? {
              ...job,
              status: "cancelled",
              auditEvents: [
                ...job.auditEvents,
                {
                  id: `${job.id}-cancelled`,
                  at: new Date().toISOString(),
                  label: "Cancelled",
                  detail: "Cancelled from the pending dashboard in local demo state."
                }
              ]
            }
          : job
      )
    );
    setCancelJob(null);
  };

  return (
    <>
      <PanelFrame title="Pending and sent email jobs" detail="All actions below mutate local component state only.">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeStatus === status ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Sender type",
                value: senderType,
                values: ["All senders", "Admin", "Teacher"],
                onChange: setSenderType
              },
              {
                label: "Program",
                value: program,
                values: ["All programs", "Boston Splash 2026"],
                onChange: setProgram
              },
              {
                label: "Template used",
                value: template,
                values: ["Any template", "Schedule Reminder", "Urgent Alert", "Newsletter / Update", "Teacher Office Hours", "Program Announcement"],
                onChange: setTemplate
              },
              {
                label: "Date range",
                value: "Next 14 days",
                values: ["Today", "Next 7 days", "Next 14 days", "All dates"],
                onChange: () => undefined
              }
            ].map((filter) => (
              <label key={filter.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="block text-xs uppercase tracking-[0.16em] text-slate-500">{filter.label}</span>
                <select
                  value={filter.value}
                  onChange={(event) => filter.onChange(event.target.value)}
                  className="mt-2 w-full border-0 bg-transparent p-0 text-sm font-medium text-slate-900 outline-none"
                >
                  {filter.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
            <div className="hidden grid-cols-[2fr_1.1fr_0.8fr_0.9fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-200 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:grid">
              <span>Subject</span>
              <span>Sender</span>
              <span>Recipients</span>
              <span>Template</span>
              <span>Scheduled</span>
              <span>Status</span>
              <span>Program</span>
              <span>More</span>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredJobs.map((job) => {
                const expanded = expandedId === job.id;

                return (
                  <div key={job.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : job.id)}
                      className="grid w-full gap-3 px-5 py-4 text-left transition hover:bg-slate-50 lg:grid-cols-[2fr_1.1fr_0.8fr_0.9fr_1fr_1fr_1fr_auto] lg:items-center"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-950">{job.subject}</div>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span>{job.senderType}</span>
                          <span>Created {format(new Date(job.createdAt), "MMM d")}</span>
                          <span>{job.sendgridOptimized ? "SendGrid optimization available" : "Queue only"}</span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-700">
                        {job.sender}
                        <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{job.senderType}</div>
                      </div>
                      <div className="text-sm text-slate-700">{job.recipientCount}</div>
                      <div className="text-sm text-slate-700">{job.templateName}</div>
                      <div className="text-sm text-slate-700">{format(new Date(job.scheduledTime), "MMM d, h:mm a")}</div>
                      <div>
                        <StatusPill status={job.status} />
                      </div>
                      <div className="text-sm text-slate-700">{job.program}</div>
                      <div className="flex items-center justify-end">
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {expanded ? (
                      <div className="grid gap-5 border-t border-slate-200 bg-slate-50/70 px-5 py-5 xl:grid-cols-[1.2fr_1fr]">
                        <div className="space-y-4">
                          <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Rendered email preview snippet</div>
                            <p className="mt-2 text-sm leading-6 text-slate-700">{job.previewSnippet}</p>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Scheduling metadata</div>
                              <div className="mt-2 space-y-1 text-sm text-slate-700">
                                <div>Delivery strategy: {job.deliveryStrategy}</div>
                                <div>Created by: {job.createdBy}</div>
                                <div>Public: {job.isPublic ? "Yes" : "No"}</div>
                              </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Recipient snapshot summary</div>
                              <p className="mt-2 text-sm leading-6 text-slate-700">{job.recipientSnapshot}</p>
                            </div>
                          </div>
                          {job.partialFailure ? (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
                              <div className="text-sm font-semibold text-rose-950">Partial failure example</div>
                              <p className="mt-2 text-sm leading-6 text-rose-800">{job.partialFailure}</p>
                            </div>
                          ) : null}
                          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Notes</div>
                            <p className="mt-2 text-sm leading-6 text-slate-700">{job.notes}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button tone="secondary" onClick={() => setCancelJob(job)}>
                              <Ban className="h-4 w-4" />
                              Cancel
                            </Button>
                            <Button tone="secondary" onClick={() => setRescheduleJob(job)}>
                              <RefreshCcw className="h-4 w-4" />
                              Reschedule
                            </Button>
                            <Button tone="secondary">
                              <Copy className="h-4 w-4" />
                              Duplicate as draft
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge>{job.templateName}</Badge>
                              <Badge tone={job.isPublic ? "accent" : "warning"}>{job.isPublic ? "Public email" : "Non-public"}</Badge>
                              <Badge tone={job.sendgridOptimized ? "info" : "neutral"}>
                                {job.sendgridOptimized ? "SendGrid available" : "Queue-only path"}
                              </Badge>
                            </div>
                          </div>
                          <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                            <div className="text-sm font-semibold text-slate-900">Audit timeline</div>
                            <div className="mt-4">
                              <AuditTimeline events={job.auditEvents} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PanelFrame>

      <RescheduleModal
        open={Boolean(rescheduleJob)}
        job={rescheduleJob}
        value={rescheduleValue}
        onChange={setRescheduleValue}
        onClose={() => setRescheduleJob(null)}
        onConfirm={confirmReschedule}
      />
      <CancelModal
        open={Boolean(cancelJob)}
        job={cancelJob}
        onClose={() => setCancelJob(null)}
        onConfirm={confirmCancel}
      />
    </>
  );
}
