const testimonials = [
  {
    name: "Maya Patel",
    title: "Head of Audio, Horizon Podcasts",
    quote:
      "We localized three flagship shows into Spanish and Hindi with Aural Forge. Quality rivals studio talent, and the compliance workflows kept our legal team happy.",
    metric: "72 hours to launch multilingual shows"
  },
  {
    name: "Jordan Kim",
    title: "Founder, OmniAds Agency",
    quote:
      "We produce hundreds of social ads weekly. The credits dashboard and webhook automation mean every deliverable ships with zero manual effort.",
    metric: "10× faster campaign production"
  },
  {
    name: "Lucas Meyer",
    title: "CTO, Nova Interactive",
    quote:
      "Enterprise SSO, SCIM provisioning, and HIPAA-ready logging let us deploy conversational agents in regulated healthcare experiences.",
    metric: "Launched HIPAA chatbot in 3 weeks"
  }
];

export function Testimonials() {
  return (
    <section className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-0">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            Trusted teams
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Loved by creators, agencies, and regulated enterprises
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass h-full rounded-2xl border border-slate-800/60 p-8"
            >
              <p className="text-sm text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6 space-y-1">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {testimonial.title}
                </p>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-200">
                {testimonial.metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
