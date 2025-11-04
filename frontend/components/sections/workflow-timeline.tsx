const steps = [
  {
    title: "Onboard",
    description: "Choose a plan, import demo projects, and connect billing, seats, and API keys in minutes.",
    impact: "Guided setup + template gallery"
  },
  {
    title: "Create",
    description: "Draft scripts, assign voices, and collaborate inside the studio with track-level permissions.",
    impact: "AI-assisted script polish and asset library"
  },
  {
    title: "Clone",
    description: "Upload consented samples, track review progress, and request professional cloning services.",
    impact: "Compliance workflows + audit trail"
  },
  {
    title: "Publish",
    description: "Render and export masters, deliver dubbed videos, and trigger webhooks for downstream systems.",
    impact: "Version history + webhook automation"
  },
  {
    title: "Scale",
    description: "Monitor credits, usage meters, and team performance. Automate provisioning via API/SCIM.",
    impact: "Live dashboards + overage controls"
  }
];

export function WorkflowTimeline() {
  return (
    <section className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-0">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            Workflow
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Ship premium voice experiences end-to-end
          </h2>
        </div>
        <div className="mt-16 space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass flex flex-col gap-6 rounded-2xl border border-slate-800/60 p-8 md:flex-row md:items-center md:gap-12"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-lg font-semibold text-brand-100">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2 text-left">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-300">{step.description}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
                {step.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
