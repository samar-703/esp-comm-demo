import { AppShell } from "@/components/app-shell";
import { TeacherComposeDemo } from "@/components/teacher-compose-demo";

export default function TeacherComposePage() {
  return (
    <AppShell pathname="/teacher/compose">
      <TeacherComposeDemo />
    </AppShell>
  );
}
