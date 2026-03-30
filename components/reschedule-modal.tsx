"use client";

import { format } from "date-fns";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui";
import type { ScheduledEmail } from "@/lib/types";

export function RescheduleModal({
  open,
  job,
  value,
  onChange,
  onClose,
  onConfirm
}: {
  open: boolean;
  job: ScheduledEmail | null;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Reschedule email" description="This updates local demo state only and keeps the queue-first summary visible.">
      {job ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-sm font-semibold text-slate-900">{job.subject}</div>
            <div className="mt-2 text-sm text-slate-600">Current time: {format(new Date(job.scheduledTime), "MMM d, yyyy h:mm a")}</div>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">New scheduled time</span>
            <input
              type="datetime-local"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-teal-400"
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button tone="ghost" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onConfirm}>Confirm reschedule</Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
