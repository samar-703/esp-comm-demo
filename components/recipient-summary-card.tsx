import { AlertTriangle } from "lucide-react";
import { Badge, PanelFrame } from "@/components/ui";

export function RecipientSummaryCard() {
  return (
    <PanelFrame title="Recipient summary" detail="This mirrors the existing admin recipient model while making the current audience easier to inspect.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Recipient list</div>
          <div className="mt-2 text-lg font-semibold text-slate-950">Boston Splash all active registrants</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>Students</Badge>
            <Badge tone="warning">Guardians</Badge>
            <Badge tone="warning">Emergency contacts</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-4 w-4 text-amber-700" />
            <div>
              <div className="text-sm font-semibold text-amber-900">1,248 recipients frozen by list selection</div>
              <p className="mt-1 text-sm leading-6 text-amber-800">
                Guardian and emergency contacts are included, so preview tone and program links should be reviewed before release.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}
