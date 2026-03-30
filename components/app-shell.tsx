import Link from "next/link";
import { Mail, LayoutTemplate, CalendarClock, BookUser, Workflow, FilePenLine } from "lucide-react";
import { navItems } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const icons = {
  "/": Mail,
  "/admin/compose": FilePenLine,
  "/admin/templates": LayoutTemplate,
  "/admin/scheduled": CalendarClock,
  "/teacher/compose": BookUser,
  "/architecture": Workflow
};

export function AppShell({
  pathname,
  children
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-[1500px] items-start gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="panel sidebar-scroll rounded-[1.75rem] border p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-950">ESP Comm Demo</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">GSoC 2026 proposal UI</div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-teal-100 bg-teal-50/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Current + proposed</div>
            <p className="mt-2 text-sm leading-6 text-slate-700">Current + proposed communications workflow.</p>
          </div>

          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = icons[item.href as keyof typeof icons] ?? Mail;
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl px-3 py-3 transition",
                    active ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-white/80"
                  )}
                >
                  <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-teal-300" : "text-slate-400")} />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className={cn("mt-1 text-xs leading-5", active ? "text-slate-300" : "text-slate-500")}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-white/90 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Architecture note</div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Queue-first scheduling is centered throughout the demo. SendGrid appears only as an optional optimization badge.
            </p>
          </div>
        </aside>

        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
}
