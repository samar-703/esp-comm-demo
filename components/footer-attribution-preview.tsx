import { PanelFrame } from "@/components/ui";

export function FooterAttributionPreview() {
  return (
    <PanelFrame title="Teacher footer preview" detail="All teacher emails add attribution so recipients know who sent the message.">
      <div className="rounded-[1.5rem] border border-dashed border-slate-400 bg-slate-50 px-5 py-5">
        <div className="text-sm leading-7 text-slate-700">
          <strong>From:</strong> Diego Alvarez, teacher for Designing Small Satellites
          <br />
          <strong>Program:</strong> Boston Splash 2026
          <br />
          This message was sent through the ESP teacher communications workflow and remains visible to administrators for audit.
        </div>
      </div>
    </PanelFrame>
  );
}
