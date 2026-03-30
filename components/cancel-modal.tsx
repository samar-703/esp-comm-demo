"use client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui";
import type { ScheduledEmail } from "@/lib/types";

export function CancelModal({
  open,
  job,
  onClose,
  onConfirm
}: {
  open: boolean;
  job: ScheduledEmail | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Cancel queued email" description="The real product would preserve the audit entry and mark the MessageRequest as cancelled.">
      {job ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
            <div className="text-sm font-semibold text-rose-950">{job.subject}</div>
            <p className="mt-2 text-sm leading-6 text-rose-800">
              This demo will mark the job as cancelled and leave the audit timeline intact.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button tone="ghost" onClick={onClose}>
              Keep scheduled
            </Button>
            <Button tone="danger" onClick={onConfirm}>
              Confirm cancel
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
