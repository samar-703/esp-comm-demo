import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "warning" | "danger" | "info";
  className?: string;
};

type BadgeTone = NonNullable<BadgeProps["tone"]>;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  const toneClasses = {
    neutral: "border-slate-200 bg-white/80 text-slate-700",
    accent: "border-teal-200 bg-teal-50 text-teal-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    danger: "border-rose-200 bg-rose-50 text-rose-800",
    info: "border-blue-200 bg-blue-50 text-blue-800"
  } satisfies Record<BadgeTone, string>;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "primary" | "secondary" | "ghost" | "danger";
};

type ButtonTone = NonNullable<ButtonProps["tone"]>;

export function Button({ tone = "primary", className, ...props }: ButtonProps) {
  const tones = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-500"
  } satisfies Record<ButtonTone, string>;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

type LinkCardProps = {
  href: string;
  title: string;
  detail: string;
};

export function LinkCard({ href, title, detail }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="panel rounded-[1.5rem] border p-5 transition hover:-translate-y-0.5 hover:border-slate-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
        </div>
        <ArrowRight className="mt-0.5 h-4 w-4 text-slate-400" />
      </div>
    </Link>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <div className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">{eyebrow}</div> : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function PanelFrame({
  title,
  detail,
  children,
  className
}: {
  title: string;
  detail?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel rounded-[1.5rem] border p-5 md:p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-950">{title}</h2>
          {detail ? <p className="mt-1 text-sm leading-6 text-slate-700">{detail}</p> : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function InlineNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
      {children}
    </div>
  );
}

export function SuccessLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-700">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-700" />
      <span>{children}</span>
    </div>
  );
}
