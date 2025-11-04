const features = [
  {
    title: "Studio production",
    description:
      "Multi-track editor with granular control, collaborative commenting, and version history for complex audio productions.",
    bullets: [
      "Timeline editing, clip splitting, crossfades",
      "Script editor with AI-assisted copy polish",
      "Export mp3, wav, 44.1kHz PCM"
    ]
  },
  {
    title: "Voice cloning",
    description:
      "Instant short-sample cloning plus professional workflows with compliance guardrails and managed services for enterprise.",
    bullets: [
      "Starter 30-second cloning",
      "Creator multi-sample training",
      "Dedicated linguist review"
    ]
  },
  {
    title: "Dubbing & localization",
    description:
      "Upload video, auto-generate translations, align lip-sync, and assign voices per segment with subtitle import/export.",
    bullets: [
      "SRT/VTT ingest & export",
      "Auto lip-sync with manual overrides",
      "32+ languages and dialects"
    ]
  },
  {
    title: "Conversational AI",
    description:
      "Deploy voice chatbots with persistent context, vector memory, and embeddable webchat widgets for your site.",
    bullets: [
      "Streaming voice + text",
      "Session analytics & transcripts",
      "Webhook + Zapier automations"
    ]
  },
  {
    title: "Speech-to-text",
    description:
      "High accuracy transcription with diarization, timestamps, punctuation, and direct download of structured transcripts.",
    bullets: [
      "Multi-speaker diarization",
      "JSON + caption exports",
      "Redaction tooling for PII"
    ]
  },
  {
    title: "Music & SFX",
    description:
      "Generate royalty-permitted music, mix underlays, and licence tracks for social campaigns without friction.",
    bullets: [
      "Genre + mood conditioned",
      "Loopable stems & stems export",
      "Commercial-ready licensing"
    ]
  }
];

export function FeatureGrid() {
  return (
    <section id="platform" className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-0">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            Platform
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            One platform for every audio AI workflow
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300">
            Combine ultra-realistic TTS, dubbing, conversational agents, and music generation with compliance-first controls for regulated industries.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass h-full rounded-2xl border border-slate-800/60 p-8 transition hover:border-brand-500/40 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <span className="text-sm text-brand-200">Pro ready</span>
              </div>
              <p className="mt-4 text-sm text-slate-300">{feature.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
