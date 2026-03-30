import { Monitor, Smartphone } from "lucide-react";
import type { PreviewPersona } from "@/lib/types";
import { Badge, Button, PanelFrame } from "@/components/ui";

function renderTemplate(source: string, variables: Record<string, string>) {
  return Object.entries(variables).reduce((output, [token, value]) => output.replaceAll(token, value), source);
}

export function PreviewPane({
  personas,
  activePersona,
  onPersonaChange,
  device,
  onDeviceChange,
  subject,
  body
}: {
  personas: PreviewPersona[];
  activePersona: PreviewPersona["id"];
  onPersonaChange: (id: PreviewPersona["id"]) => void;
  device: "desktop" | "mobile";
  onDeviceChange: (device: "desktop" | "mobile") => void;
  subject: string;
  body: string;
}) {
  const persona = personas.find((entry) => entry.id === activePersona) ?? personas[0];
  const renderedBody = renderTemplate(body, persona.variables);
  const renderedSubject = renderTemplate(subject, persona.variables);

  return (
    <PanelFrame title="Preview and inspector" detail="Preview personas make proposed template and scheduling behavior legible before any MessageRequest is created.">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {personas.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onPersonaChange(entry.id)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                activePersona === entry.id ? "bg-slate-950 text-white" : "border border-slate-300 bg-slate-50 text-slate-700"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="info">{persona.role}</Badge>
          <div className="flex gap-2 rounded-full border border-slate-300 bg-slate-50 p-1">
            <Button tone={device === "desktop" ? "primary" : "ghost"} className="rounded-full px-3 py-1.5" onClick={() => onDeviceChange("desktop")}>
              <Monitor className="h-4 w-4" />
              Desktop email preview
            </Button>
            <Button tone={device === "mobile" ? "primary" : "ghost"} className="rounded-full px-3 py-1.5" onClick={() => onDeviceChange("mobile")}>
              <Smartphone className="h-4 w-4" />
              Mobile email preview
            </Button>
          </div>
        </div>

        <div className={`mx-auto rounded-[1.8rem] border border-slate-300 bg-white shadow-soft ${device === "mobile" ? "max-w-[360px]" : "max-w-none"}`}>
          <div className="border-b border-slate-300 px-5 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Subject</div>
            <div className="mt-2 text-base font-semibold text-slate-950">{renderedSubject || "Untitled message"}</div>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-500">
              Rendered from mocked preview persona data only
            </div>
            <div className="text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: renderedBody }} />
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}
