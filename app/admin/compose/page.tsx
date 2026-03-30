import { AppShell } from "@/components/app-shell";
import { AdminComposeDemo } from "@/components/admin-compose-demo";

export default function AdminComposePage() {
  return (
    <AppShell pathname="/admin/compose">
      <AdminComposeDemo />
    </AppShell>
  );
}
