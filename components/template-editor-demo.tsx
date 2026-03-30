"use client";

import { useMemo, useState } from "react";
import { Clock3, Copy, FolderClock, ShieldAlert } from "lucide-react";
import type { TemplateRecord } from "@/lib/types";
import { previewPersonas, templateRecords, variableGroups } from "@/data/mock-data";
import { defaultCustomBody, renderVariables } from "@/lib/email";
import { FooterAttributionPreview } from "@/components/footer-attribution-preview";
import { VariablePicker } from "@/components/variable-picker";
import { Badge, Button, PanelFrame, SectionHeading } from "@/components/ui";

export function TemplateEditorDemo({
  mode,
  template
}: {
  mode: "new" | "edit";
  template?: TemplateRecord;
}) {
  const source = template ?? templateRecords[0];
  const [name, setName] = useState(mode === "new" ? "Family logistics recap" : source.name);
  const [description, setDescription] = useState(mode === "new" ? "Weekly logistics note for students and guardians." : source.description);
  const [scope, setScope] = useState<"Global" | "Program-specific">(mode === "new" ? "Program-specific" : source.scope === "Global" ? "Global" : "Program-specific");
  const [subject, setSubject] = useState(mode === "new" ? "{{program_name}} logistics recap" : source.subjectTemplate);
  const [body, setBody] = useState(mode === "new" ? defaultCustomBody : source.bodyTemplate);
  const [validationTouched, setValidationTouched] = useState(false);

  const preview = useMemo(() => renderVariables(body, previewPersonas[0].variables), [body]);
  const hasErrors = validationTouched && name.trim().length < 4;

  const handleInsert = (token: string) => {
    setBody((current) => `${current}${current.endsWith("</p>") ? "" : " "}${token}`);
  };

  return (
    <div className="space-y-4">
      <SectionHeading
        eyebrow={mode === "new" ? "Create template" : "Edit template"}
        title={mode === "new" ? "New Template" : `Edit Template: ${source.name}`}
        description={
          mode === "new"
            ? "This mock create flow shows how reusable templates could be authored, previewed, validated, and saved for immediate use."
            : "This mock edit flow includes version history context, duplication metadata, and archive controls without introducing any backend dependency."
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            {mode === "edit" && source.duplicatedFrom ? <Badge tone="info">Duplicated from {source.duplicatedFrom}</Badge> : null}
            <Badge tone="accent">{scope}</Badge>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <PanelFrame title="Template details" detail="Templates remain frontend-only in this demo, but the UI reflects a realistic CRUD workflow.">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Template name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => setValidationTouched(true)}
                  className={`w-full rounded-[1.2rem] border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${hasErrors ? "border-rose-300" : "border-slate-200 focus:border-teal-400"}`}
                />
                {hasErrors ? <div className="mt-2 text-sm text-rose-700">Template name should be at least 4 characters.</div> : null}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Scope selector</span>
                <select
                  value={scope}
                  onChange={(event) => setScope(event.target.value as "Global" | "Program-specific")}
                  className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400"
                >
                  <option value="Global">Global</option>
                  <option value="Program-specific">Program-specific</option>
                </select>
              </label>
              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-[100px] w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400"
                />
              </label>
              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Subject template</span>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400"
                />
              </label>
            </div>
          </PanelFrame>

          <PanelFrame title="Body editor" detail="Starter template shortcuts reduce authoring overhead for common comm panel use cases.">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {["Program Announcement", "Schedule Reminder", "Newsletter / Update", "Urgent Alert"].map((preset) => (
                  <button key={preset} type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-teal-300 hover:bg-teal-50/70">
                    Starter template from preset: {preset}
                  </button>
                ))}
              </div>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                className="min-h-[320px] w-full rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-teal-400"
              />
              <div className="flex flex-wrap gap-2">
                <Button tone="secondary" onClick={() => setValidationTouched(true)}>
                  Save draft
                </Button>
                <Button>Save and use</Button>
                {mode === "edit" ? (
                  <>
                    <Button tone="secondary">
                      <Copy className="h-4 w-4" />
                      Duplicate template
                    </Button>
                    <Button tone="ghost" className="text-rose-700">
                      Archive template
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </PanelFrame>

          <VariablePicker groups={variableGroups} onInsert={handleInsert} />
        </div>

        <div className="space-y-4">
          {mode === "edit" ? (
            <PanelFrame title="Version history" detail="Mock history sidebar showing the kind of version context admins would expect.">
              <div className="space-y-3">
                {[
                  { label: "v4 current", detail: "Edited today by Priya Menon" },
                  { label: "v3", detail: "Duplicated from starter pack on Mar 24" },
                  { label: "v2", detail: "Program links updated for family-safe copy" },
                  { label: "v1", detail: "Original starter template import" }
                ].map((version) => (
                  <div key={version.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">{version.label}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{version.detail}</div>
                  </div>
                ))}
              </div>
            </PanelFrame>
          ) : (
            <PanelFrame title="Validation states" detail="Mock validation keeps the create flow realistic without any backend dependency.">
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <FolderClock className="mt-1 h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Draft-safe by default</div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Unsaved changes stay local until Save draft or Save and use is selected.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                  <ShieldAlert className="mt-1 h-4 w-4 text-amber-700" />
                  <div>
                    <div className="text-sm font-semibold text-amber-900">Program scope matters</div>
                    <p className="mt-1 text-sm leading-6 text-amber-800">Program-specific templates should be reviewed for cross-program links before publishing.</p>
                  </div>
                </div>
              </div>
            </PanelFrame>
          )}

          <PanelFrame title="Live preview" detail="Rendered with sample student data, matching the proposal’s emphasis on preview before release.">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="text-base font-semibold text-slate-950">{renderVariables(subject, previewPersonas[0].variables)}</div>
              <div className="mt-4 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
          </PanelFrame>

          {mode === "edit" ? (
            <PanelFrame title="Template metadata" detail="Duplicate/source information helps explain safe reuse in the proposal.">
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <Clock3 className="mt-1 h-4 w-4 text-slate-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Last edited</div>
                    <div className="mt-1 text-sm text-slate-600">{new Date(source.lastEdited).toLocaleString()}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600">
                  Duplicated from: {source.duplicatedFrom ?? "Original record"}
                </div>
              </div>
            </PanelFrame>
          ) : null}

          <FooterAttributionPreview />
        </div>
      </div>
    </div>
  );
}
