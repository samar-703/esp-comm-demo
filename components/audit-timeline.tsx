import { format } from "date-fns";
import type { AuditEvent } from "@/lib/types";

export function AuditTimeline({ events }: { events: AuditEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-slate-950" />
            {index < events.length - 1 ? <div className="mt-1 h-full w-px bg-slate-200" /> : null}
          </div>
          <div className="pb-4">
            <div className="text-sm font-semibold text-slate-900">{event.label}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{format(new Date(event.at), "MMM d, yyyy h:mm a")}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{event.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
