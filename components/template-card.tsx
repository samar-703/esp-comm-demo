import Link from "next/link";
import { Copy, Eye, FilePenLine, Trash2, WandSparkles } from "lucide-react";
import type { TemplateRecord } from "@/lib/types";
import { Badge, Button } from "@/components/ui";

export function TemplateCard({
  template,
  listView = false,
  onPreview,
  onUse
}: {
  template: TemplateRecord;
  listView?: boolean;
  onPreview: (template: TemplateRecord) => void;
  onUse: (template: TemplateRecord) => void;
}) {
  return (
    <div className={`panel rounded-[1.5rem] border p-5 ${listView ? "grid gap-4 lg:grid-cols-[1.4fr_0.9fr]" : "space-y-5"}`}>
      <div className="space-y-4">
        <div className="rounded-[1.35rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-teal-50 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Preview block</div>
          <div className="mt-3 text-sm font-medium leading-6 text-slate-700">{template.thumbnail}</div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-950">{template.name}</h3>
            <Badge tone={template.scope === "Starter" ? "accent" : template.scope === "Global" ? "info" : "warning"}>{template.scope}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Last edited</div>
            <div className="mt-1 font-medium text-slate-900">{new Date(template.lastEdited).toLocaleDateString()}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Variables</div>
            <div className="mt-1 font-medium text-slate-900">{template.variableCount} supported</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Author</div>
            <div className="mt-1 font-medium text-slate-900">{template.author}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Scope</div>
            <div className="mt-1 font-medium text-slate-900">{template.programLabel ?? template.scope}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => onUse(template)}>
            <WandSparkles className="h-4 w-4" />
            Use template
          </Button>
          <Button tone="secondary" onClick={() => onPreview(template)}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button tone="secondary">
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Link
            href={`/admin/templates/${template.id}/edit`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
          >
            <FilePenLine className="h-4 w-4" />
            Edit
          </Link>
          <Button tone="ghost" className="col-span-2 justify-center text-rose-700">
            <Trash2 className="h-4 w-4" />
            Archive / Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
