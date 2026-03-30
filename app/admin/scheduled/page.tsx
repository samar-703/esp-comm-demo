import { AppShell } from "@/components/app-shell";
import { ScheduledTable } from "@/components/scheduled-table";
import { Badge, PanelFrame, SectionHeading } from "@/components/ui";
import { scheduledEmails } from "@/data/mock-data";

export default function ScheduledPage() {
  return (
    <AppShell pathname="/admin/scheduled">
      <SectionHeading
        eyebrow="Deliverable B"
        title="Scheduled Email Dashboard"
        description="This queue-first dashboard makes draft, scheduled, processing, sent, failed, and cancelled states visible in one place, with local-state reschedule and cancel interactions."
        action={
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Queue-first scheduling</Badge>
            <Badge tone="info">Teacher-initiated jobs included</Badge>
          </div>
        }
      />

      <PanelFrame title="Status model" detail="The proposed dashboard gives scheduling a first-class operational surface without changing the underlying delivery concepts.">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {["draft", "scheduled", "processing", "sent", "failed", "cancelled"].map((status) => (
            <div key={status} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-semibold text-slate-700">
              {status}
            </div>
          ))}
        </div>
      </PanelFrame>

      <ScheduledTable initialJobs={scheduledEmails} />
    </AppShell>
  );
}
