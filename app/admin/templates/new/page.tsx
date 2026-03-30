import { AppShell } from "@/components/app-shell";
import { TemplateEditorDemo } from "@/components/template-editor-demo";

export default function NewTemplatePage() {
  return (
    <AppShell pathname="/admin/templates">
      <TemplateEditorDemo mode="new" />
    </AppShell>
  );
}
