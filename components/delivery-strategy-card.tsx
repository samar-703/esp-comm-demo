import { CheckCircle2 } from "lucide-react";
import type { DeliveryStrategy } from "@/lib/types";
import { Badge, PanelFrame } from "@/components/ui";

export function DeliveryStrategyCard({ strategy }: { strategy: DeliveryStrategy }) {
  return (
    <PanelFrame title="Delivery strategy" detail="Deliverable B is shown as queue-first scheduling, with provider optimization deliberately secondary.">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge tone="accent">Queue-first scheduling</Badge>
          <Badge tone="info">Optional SendGrid optimization</Badge>
          <Badge>Recipient snapshot</Badge>
        </div>
        {[strategy.queueFirst, strategy.sendgrid, strategy.snapshot].map((line) => (
          <div key={line} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            <p className="text-sm leading-6 text-slate-700">{line}</p>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}
