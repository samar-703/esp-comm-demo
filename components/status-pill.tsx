import type { ScheduledStatus } from "@/lib/types";

const styles: Record<ScheduledStatus, string> = {
  draft: "border-slate-200 bg-slate-100 text-slate-700",
  scheduled: "border-blue-200 bg-blue-50 text-blue-700",
  processing: "border-amber-200 bg-amber-50 text-amber-700",
  sent: "border-teal-200 bg-teal-50 text-teal-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
  cancelled: "border-slate-200 bg-white text-slate-500"
};

export function StatusPill({ status }: { status: ScheduledStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${styles[status]}`}>
      {status}
    </span>
  );
}
