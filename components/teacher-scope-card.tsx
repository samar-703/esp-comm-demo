import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge, PanelFrame } from "@/components/ui";

export function TeacherScopeCard() {
  return (
    <PanelFrame title="Teacher scope guardrails" detail="This panel is intentionally more constrained than admin compose.">
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-teal-700" />
          <div>
            <div className="text-sm font-semibold text-slate-900">Class-scoped recipient selection only</div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Teachers can pick one class or all of their classes, but cannot run arbitrary recipient filters.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4">
          <LockKeyhole className="mt-0.5 h-4 w-4 text-slate-700" />
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">Shared templates stay read-only</div>
              <Badge tone="warning">No admin-only settings</Badge>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Template definitions remain centrally managed. Teacher messages are still auditable by admins in the shared dashboard.
            </p>
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}
