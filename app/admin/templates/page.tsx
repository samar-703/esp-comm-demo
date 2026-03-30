import { AppShell } from "@/components/app-shell";
import { TemplateLibraryDemo } from "@/components/template-library-demo";

export default function AdminTemplatesPage() {
  return (
    <AppShell pathname="/admin/templates">
      <TemplateLibraryDemo />
    </AppShell>
  );
}
