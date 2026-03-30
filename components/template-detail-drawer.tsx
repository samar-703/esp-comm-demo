"use client";

import Link from "next/link";
import { Copy, FilePenLine, WandSparkles } from "lucide-react";
import type { TemplateRecord } from "@/lib/types";
import { Modal } from "@/components/modal";
import { Badge, Button } from "@/components/ui";

function renderSubject(template: TemplateRecord) {
  return template.subjectTemplate
    .replaceAll("{{program_name}}", "Boston Splash 2026")
    .replaceAll("{{student_name}}", "Avery Kim")
    .replaceAll("{{guardian_name}}", "Jordan Kim")
    .replaceAll("{{class_title}}", "Designing Small Satellites")
    .replaceAll("{{request_deadline}}", "April 9 at 11:59 PM")
    .replaceAll("{{support_email}}", "splash@esp.example")
    .replaceAll("{{teacher_footer}}", "Sent by Diego Alvarez.");
}

export function TemplateDetailDrawer({
  template,
  open,
  onClose,
  onUse
}: {
  template: TemplateRecord | null;
  open: boolean;
  onClose: () => void;
  onUse: (template: TemplateRecord) => void;
}) {
  if (!template) return null;

  return (
    <Modal open={open} onClose={onClose} title={template.name} description={template.description} className="max-w-4xl">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge tone={template.scope === "Starter" ? "accent" : template.scope === "Global" ? "info" : "warning"}>{template.scope}</Badge>
            <Badge>{template.variableCount} variables</Badge>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Subject template</div>
            <div className="mt-2 text-sm font-medium text-slate-800">{template.subjectTemplate}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Variables used</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {template.bodyTemplate.match(/{{[^}]+}}/g)?.map((token) => (
                <span key={token} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  {token}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Notes on intended use</div>
            <p className="mt-2 text-sm leading-6 text-slate-700">{template.notes}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => onUse(template)}>
              <WandSparkles className="h-4 w-4" />
              Use template
            </Button>
            <Button tone="secondary">
              <Copy className="h-4 w-4" />
              Duplicate
            </Button>
            <Link
              href={`/admin/templates/${template.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              <FilePenLine className="h-4 w-4" />
              Edit
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Example rendered output</div>
            <div className="mt-3 text-base font-semibold text-slate-950">{renderSubject(template)}</div>
            <div className="mt-4 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: template.bodyTemplate
              .replaceAll("{{program_name}}", "Boston Splash 2026")
              .replaceAll("{{student_name}}", "Avery Kim")
              .replaceAll("{{guardian_name}}", "Jordan Kim")
              .replaceAll("{{class_title}}", "Designing Small Satellites")
              .replaceAll("{{request_deadline}}", "April 9 at 11:59 PM")
              .replaceAll("{{support_email}}", "splash@esp.example")
              .replaceAll("{{teacher_footer}}", "Sent by Diego Alvarez.") }} />
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-300">HTML preview</div>
            <pre className="mt-3 overflow-auto whitespace-pre-wrap font-mono text-xs leading-6 text-slate-200">{template.bodyTemplate}</pre>
          </div>
        </div>
      </div>
    </Modal>
  );
}
