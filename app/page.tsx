import { AppShell } from "@/components/app-shell";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { LinkCard, PanelFrame, SectionHeading } from "@/components/ui";
import { architecturePipeline, overviewCards } from "@/data/mock-data";

export default function HomePage() {
  return (
    <AppShell pathname="/">
      <div className="space-y-5 md:space-y-6">
        <SectionHeading
          eyebrow="ESP Website communications modernization"
          title="Proposal Demo Overview"
          description="This demo shows how the ESP communications panel can be modernized without replacing its existing delivery pipeline. It focuses on reusable templates, queue-first scheduling, and a new teacher messaging workflow."
        />

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <PanelFrame
            title="What exists today"
            detail="The current admin communications panel already supports recipient filtering, HTML composition, template variables, preview, and queued delivery."
          >
            <div className="grid gap-3">
              {[
                {
                  title: "Existing admin workflow",
                  body: "Admin communications panel already exists and already creates queued email jobs."
                },
                {
                  title: "Current authoring capabilities",
                  body: "Recipient filtering, HTML composition, template variables, preview, and queued delivery are already part of the current workflow."
                },
                {
                  title: "Current delivery model",
                  body: "The existing mental model is: Comm Panel → MessageRequest → cron → TextOfEmail → Mail Backend."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-700">{item.body}</div>
                </div>
              ))}
            </div>
          </PanelFrame>

          <PanelFrame
            title="What this proposal adds"
            detail="This proposal adds product-layer improvements on top of the existing email pipeline. It does not replace the current queue architecture."
          >
            <div className="grid gap-3">
              {[
                {
                  title: "Reusable template library",
                  body: "Starter templates, saved templates, search, preview, and detail views."
                },
                {
                  title: "Scheduled sending",
                  body: "A first-class scheduling workflow with queue-aware behavior, visibility, and audit detail."
                },
                {
                  title: "Teacher messaging",
                  body: "A new in-app workflow with safe class-scoped sending and shared audit visibility."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-teal-200 bg-teal-50/80 px-4 py-4">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-800">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-teal-950">{item.body}</div>
                </div>
              ))}
            </div>
          </PanelFrame>
        </div>

        <ArchitectureDiagram title="Current vs proposed architecture" current={architecturePipeline.current} proposed={architecturePipeline.proposed} />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {overviewCards.map((card) => (
            <LinkCard key={card.href} href={card.href} title={card.title} detail={card.detail} />
          ))}
        </section>

        <PanelFrame title="Why this approach fits the current codebase" detail="These choices keep the proposal aligned with ESP’s existing queue-based delivery pipeline.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-5">
              <div className="text-sm font-semibold text-slate-900">Queue-first by design</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Scheduling is presented as future queue release, not a separate sending engine.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-5">
              <div className="text-sm font-semibold text-slate-900">Optional SendGrid optimization</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Provider-native scheduling may help in some deployments, but the queue model stays central.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-5">
              <div className="text-sm font-semibold text-slate-900">Teacher workflow is additive</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Teacher messaging is shown as a new audited workflow layered onto the existing communications system.
              </p>
            </div>
          </div>
        </PanelFrame>
      </div>
    </AppShell>
  );
}
