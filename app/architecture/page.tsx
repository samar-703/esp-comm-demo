import { AppShell } from "@/components/app-shell";
import { ArchitectureDiagram, ArchitectureNote, FlowGrid } from "@/components/architecture-diagram";
import { PanelFrame, SectionHeading } from "@/components/ui";
import { architectureBlocks, architecturePipeline } from "@/data/mock-data";

export default function ArchitecturePage() {
  return (
    <AppShell pathname="/architecture">
      <SectionHeading
        eyebrow="Technical explanation"
        title="Architecture Mapping"
        description="These diagrams explain how the proposed UI fits the current ESP communications system: templates formalize reuse, scheduling stays queue-first, and teacher messaging remains constrained and auditable."
      />

      <ArchitectureDiagram title="Current vs proposed architecture" current={architecturePipeline.current} proposed={architecturePipeline.proposed} />

      <PanelFrame title="Current and proposed workflow diagrams" detail="These flows connect the existing delivery path to the proposed UX surfaces.">
        <FlowGrid blocks={[architectureBlocks[0], architectureBlocks[1]]} />
      </PanelFrame>

      <PanelFrame title="Scheduling flow diagram" detail="Deliverable B is visualized as future queue release first, with provider optimization kept secondary.">
        <FlowGrid blocks={[architectureBlocks[3]]} />
      </PanelFrame>

      <PanelFrame title="Template and teacher scope diagrams" detail="Reusable templates and teacher messaging are additive UI layers over the current communications pipeline.">
        <FlowGrid blocks={[architectureBlocks[2], architectureBlocks[4]]} />
      </PanelFrame>

      <ArchitectureNote text="Current architecture: Admin selects recipients → Compose email → Preview → Create MessageRequest → Cron expands to TextOfEmail → Mail backend sends." />
      <ArchitectureNote text="Proposed template flow: Open template library → Choose starter or saved template → Populate compose form → Preview with sample recipients → Send test / send / schedule." />
      <ArchitectureNote text="Proposed scheduling flow: Compose → Choose send now or schedule → Freeze recipients now → Queue for future release → Show in pending dashboard → Cancel / reschedule / send complete." />
      <ArchitectureNote text="Proposed teacher flow: Teacher selects own class → Chooses approved template or custom message → Views recipient count only → Adds schedule if enabled → Message appears in shared audit dashboard." />
    </AppShell>
  );
}
