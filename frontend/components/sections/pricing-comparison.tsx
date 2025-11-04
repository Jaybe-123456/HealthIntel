const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "10k credits, core TTS/STT, limited studio, API sandbox",
    features: [
      "10k monthly credits",
      "TTS & STT with basic voices",
      "Studio projects (5)",
      "API access (low concurrency)",
      "Guided onboarding"
    ]
  },
  {
    name: "Starter",
    price: "$5",
    description: "Creators launching commercial voice projects",
    features: [
      "30k monthly credits",
      "Commercial license",
      "Instant voice cloning",
      "Dubbing studio",
      "Music usage for social/ads"
    ]
  },
  {
    name: "Creator",
    price: "$11",
    description: "Frequent producers needing pro-grade output",
    features: [
      "100k monthly credits",
      "Pro voice cloning workflow",
      "Usage-based overages",
      "192 kbps mastering",
      "Priority project rendering"
    ]
  },
  {
    name: "Pro",
    price: "$99",
    description: "Studios scaling localization and dubbing",
    features: [
      "500k monthly credits",
      "44.1kHz PCM API output",
      "High concurrency",
      "Advanced export options",
      "Priority email support"
    ]
  },
  {
    name: "Scale",
    price: "$330",
    description: "Multi-seat teams with admin controls",
    features: [
      "2M credits + 3 seats",
      "Team admin console",
      "Elevated concurrency",
      "Workspace usage quotas",
      "Audit-ready reporting"
    ]
  },
  {
    name: "Business",
    price: "$1320",
    description: "Large organizations needing SLAs",
    features: [
      "11M credits + 5 seats",
      "3 professional voice clones",
      "Low-latency TTS pricing",
      "Dedicated success manager",
      "SLA-backed support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Global enterprises with compliance needs",
    features: [
      "Custom credits & seats",
      "HIPAA BAA & custom DPA",
      "Managed dubbing services",
      "Custom SSO (SAML/SCIM)",
      "Professional services team"
    ]
  }
];

export function PricingComparison() {
  return (
    <section id="pricing" className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-0">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            Pricing
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Flexible plans for creators, teams, and enterprises
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300">
            Start free, scale with seat management and overage billing, or partner with us for compliant enterprise deployments.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-card transition hover:border-brand-500/40"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <span className="text-sm text-brand-200">{tier.price}/mo</span>
              </div>
              <p className="mt-4 text-sm text-slate-300">{tier.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button className="mt-auto rounded-lg border border-brand-500/40 px-4 py-2 text-sm font-semibold text-brand-100 transition hover:bg-brand-500/10">
                Choose plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
