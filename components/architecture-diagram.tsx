import { ArrowRight } from "lucide-react";
import type { ArchitectureBlock } from "@/lib/types";
import { Badge, InlineNote, PanelFrame } from "@/components/ui";

export function ArchitectureDiagram({
  title,
  current,
  proposed
}: {
  title: string;
  current: string[];
  proposed: string[];
}) {
  const renderLane = (label: string, steps: string[], tone: "neutral" | "accent") => (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white/85 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
        <Badge tone={tone === "accent" ? "accent" : "neutral"} className="font-mono text-[11px] md:text-xs">
          {label === "Current" ? "Exists today" : "Proposed"}
        </Badge>
      </div>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        {steps.map((step, index) => (
          <div key={`${label}-${step}`} className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-[13px] font-medium text-slate-700 md:text-sm">
              {step}
            </div>
            {index < steps.length - 1 ? <ArrowRight className="hidden h-4 w-4 text-slate-400 lg:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <PanelFrame title={title} detail="The proposal keeps the existing queue model and layers clearer authoring and scheduling workflows on top.">
      <div className="space-y-4">
        {renderLane("Current", current, "neutral")}
        {renderLane("Proposed", proposed, "accent")}
      </div>
    </PanelFrame>
  );
}

export function FlowGrid({ blocks }: { blocks: ArchitectureBlock[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {blocks.map((block) => (
        <PanelFrame key={block.id} title={block.title} detail={block.note}>
          <div className="space-y-3">
            {block.steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                  {index + 1}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700">{step}</div>
              </div>
            ))}
          </div>
        </PanelFrame>
      ))}
    </div>
  );
}

export function ArchitectureNote({ text }: { text: string }) {
  return <InlineNote>{text}</InlineNote>;
}
