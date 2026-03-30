import { AlertTriangle, CircleAlert, Info } from "lucide-react";
import type { WarningItem } from "@/lib/types";

const toneMap = {
  warning: {
    wrapper: "border-amber-200 bg-amber-50/90",
    title: "text-amber-950",
    body: "text-amber-800",
    icon: AlertTriangle
  },
  danger: {
    wrapper: "border-rose-200 bg-rose-50/90",
    title: "text-rose-950",
    body: "text-rose-800",
    icon: CircleAlert
  },
  info: {
    wrapper: "border-blue-200 bg-blue-50/90",
    title: "text-blue-950",
    body: "text-blue-800",
    icon: Info
  }
};

export function WarningStack({ warnings }: { warnings: WarningItem[] }) {
  return (
    <div className="space-y-3">
      {warnings.map((warning) => {
        const style = toneMap[warning.tone];
        const Icon = style.icon;

        return (
          <div key={warning.id} className={`rounded-2xl border p-4 ${style.wrapper}`}>
            <div className="flex items-start gap-3">
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.body}`} />
              <div>
                <div className={`text-sm font-semibold ${style.title}`}>{warning.title}</div>
                <p className={`mt-1 text-sm leading-6 ${style.body}`}>{warning.description}</p>
                <div className={`mt-2 text-xs uppercase tracking-[0.14em] ${style.body}`}>{warning.condition}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
