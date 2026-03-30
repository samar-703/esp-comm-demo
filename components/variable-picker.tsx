"use client";

import { Sparkles } from "lucide-react";
import type { VariableGroup } from "@/lib/types";
import { Badge, Button, PanelFrame } from "@/components/ui";

export function VariablePicker({
  groups,
  onInsert
}: {
  groups: VariableGroup[];
  onInsert: (token: string) => void;
}) {
  return (
    <PanelFrame title="Insert variables" detail="Variables are grouped to reflect the existing context sources already used by ESP emails.">
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="rounded-2xl border border-slate-200 bg-white/90 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-900">{group.label}</div>
              <Badge tone="info">{group.variables.length} tokens</Badge>
            </div>
            <div className="mt-3 space-y-2">
              {group.variables.map((variable) => (
                <button
                  key={variable.token}
                  type="button"
                  onClick={() => onInsert(variable.token)}
                  className="flex w-full items-start justify-between gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-left transition hover:border-teal-200 hover:bg-teal-50/70"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-teal-800">{variable.token}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{variable.description}</div>
                  </div>
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        ))}
        <Button tone="secondary" className="w-full justify-center">
          Open variable drawer
        </Button>
      </div>
    </PanelFrame>
  );
}
