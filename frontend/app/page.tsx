import Link from "next/link";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { Testimonials } from "@/components/sections/testimonials";
import { WorkflowTimeline } from "@/components/sections/workflow-timeline";

export default function LandingPage() {
  return (
    <div className="gradient-bg">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-24 pt-32 text-center lg:px-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-100">
            Ultra Human AI Voices
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Ship immersive audio stories 10× faster with <span className="text-brand-300">Aural Forge</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Produce lifelike voiceovers, localized dubs, conversational agents, and compliant productions on one platform. Blend consumer-grade simplicity with enterprise-ready automation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className="rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
            >
              Generate your first voice →
            </Link>
            <Link
              href="/api"
              className="rounded-lg border border-slate-700 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
            >
              Explore API docs
            </Link>
          </div>
          <div className="glass glow relative mt-16 w-full rounded-3xl border border-brand-500/20 p-1">
            <div className="grid gap-6 rounded-[calc(theme(borderRadius.3xl)-0.25rem)] bg-slate-950/80 p-10 md:grid-cols-2">
              <div className="space-y-4 text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
                  Voice Composer
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Craft cinematic voiceovers with granular control
                </h2>
                <p className="text-sm text-slate-300">
                  Adjust prosody, pitch, pacing, and warmth. Layer multi-speaker timelines, import scripts, and export broadcast-ready masters in one click.
                </p>
                <ul className="grid gap-2 text-sm text-slate-300">
                  <li>• 32+ languages, auto-detect accents</li>
                  <li>• SSML commands & emotional styles</li>
                  <li>• Instant voice cloning from 30 seconds of audio</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-card">
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Narration</p>
                    <p className="mt-2 text-sm text-slate-200">
                      “Welcome to the Aural Forge studio. Today, you’ll learn how to launch a bilingual podcast and automate weekly production in minutes.”
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 p-4">
                    <p className="text-xs uppercase tracking-wider text-brand-200">Prosody</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                      <span>Warmth</span>
                      <span>72%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-900">
                      <span className="block h-2 w-3/4 rounded-full bg-brand-400" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Timeline</p>
                    <div className="mt-3 h-24 rounded-lg border border-slate-800 bg-slate-950/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid />
      <WorkflowTimeline />
      <PricingComparison />
      <Testimonials />

      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold text-white">Ready to launch your audio AI studio?</h2>
          <p className="max-w-2xl text-base text-slate-300">
            Sign up in minutes, generate your first production instantly, and scale globally with enterprise controls, webhooks, and SDKs.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className="rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
            >
              Launch onboarding
            </Link>
            <Link
              href="/contact/sales"
              className="rounded-lg border border-slate-700 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
