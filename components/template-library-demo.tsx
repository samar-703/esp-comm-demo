"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Grid2x2, List, Search } from "lucide-react";
import { templateFilters, templateRecords } from "@/data/mock-data";
import type { TemplateRecord } from "@/lib/types";
import { TemplateCard } from "@/components/template-card";
import { TemplateDetailDrawer } from "@/components/template-detail-drawer";
import { Badge, Button, SectionHeading } from "@/components/ui";

export function TemplateLibraryDemo() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recently edited");
  const [listView, setListView] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<TemplateRecord | null>(templateRecords[0]);

  const filtered = useMemo(() => {
    return templateRecords
      .filter((template) => {
        const matchesFilter =
          activeFilter === "All" ||
          (activeFilter === "Global" && template.scope === "Global") ||
          (activeFilter === "Program-specific" && template.scope === "Program-specific") ||
          (activeFilter === "Starter templates" && template.scope === "Starter") ||
          (activeFilter === "Recently edited" && new Date(template.lastEdited).getTime() > new Date("2026-03-25").getTime());

        const needle = query.toLowerCase();
        const matchesSearch =
          needle.length === 0 ||
          template.name.toLowerCase().includes(needle) ||
          template.description.toLowerCase().includes(needle) ||
          template.tags.some((tag) => tag.toLowerCase().includes(needle));

        return matchesFilter && matchesSearch;
      })
      .sort((left, right) => {
        if (sort === "Name") return left.name.localeCompare(right.name);
        if (sort === "Variables") return right.variableCount - left.variableCount;
        return new Date(right.lastEdited).getTime() - new Date(left.lastEdited).getTime();
      });
  }, [activeFilter, query, sort]);

  return (
    <>
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Deliverable A"
          title="Template Library"
          description="Templates are formalized into a reusable library so admins stop rewriting HTML from scratch every cycle, while the underlying delivery path stays the same."
          action={
            <div className="flex gap-2">
              <Link href="/admin/templates/new">
                <Button>Create template</Button>
              </Link>
            </div>
          }
        />

        <div className="panel rounded-[1.5rem] border p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="flex flex-wrap gap-2">
              {templateFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="flex min-w-[260px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search templates"
                className="w-full border-0 bg-transparent text-sm outline-none"
              />
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <ArrowUpDown className="h-4 w-4 text-slate-400" />
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="border-0 bg-transparent text-sm outline-none">
                  <option>Recently edited</option>
                  <option>Name</option>
                  <option>Variables</option>
                </select>
              </label>
              <div className="flex rounded-full border border-slate-200 bg-white p-1">
                <button type="button" onClick={() => setListView(false)} className={`rounded-full px-3 py-2 ${!listView ? "bg-slate-950 text-white" : "text-slate-600"}`}>
                  <Grid2x2 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setListView(true)} className={`rounded-full px-3 py-2 ${listView ? "bg-slate-950 text-white" : "text-slate-600"}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="accent">4 starter templates included</Badge>
            <Badge tone="info">Use, preview, duplicate, edit, archive actions</Badge>
          </div>
        </div>

        <div className={`grid gap-4 ${listView ? "grid-cols-1" : "xl:grid-cols-2"}`}>
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              listView={listView}
              onPreview={setActiveTemplate}
              onUse={setActiveTemplate}
            />
          ))}
        </div>
      </div>

      <TemplateDetailDrawer
        template={activeTemplate}
        open={Boolean(activeTemplate)}
        onClose={() => setActiveTemplate(null)}
        onUse={setActiveTemplate}
      />
    </>
  );
}
