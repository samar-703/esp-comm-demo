import { AppShell } from "@/components/app-shell";
import { TemplateEditorDemo } from "@/components/template-editor-demo";
import { templateRecords } from "@/data/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return templateRecords.map((record) => ({ id: record.id }));
}

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const template = templateRecords.find((record) => record.id === params.id) ?? templateRecords[0];

  return (
    <AppShell pathname="/admin/templates">
      <TemplateEditorDemo mode="edit" template={template} />
    </AppShell>
  );
}
