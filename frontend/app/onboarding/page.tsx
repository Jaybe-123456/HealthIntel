import Link from "next/link";

const steps = [
  {
    title: "Create account",
    detail: "Sign up with email, Google, GitHub, or Apple. Enable MFA or passwordless magic link for added security."
  },
  {
    title: "Pick a plan",
    detail: "Start on Free or trial Creator for 14 days. Add billing to unlock higher concurrency and seat management."
  },
  {
    title: "Generate demo",
    detail: "Use our guided flow to create your first multilingual voiceover with templates for podcasts, ads, or localizations."
  },
  {
    title: "Invite teammates",
    detail: "Assign roles (Owner, Admin, Editor, Viewer), set seat quotas, and connect SSO/SCIM for automated provisioning."
  }
];

export const metadata = {
  title: "Onboarding | Aural Forge",
  description: "Guided setup for launching your audio AI studio in minutes."
};

export default function OnboardingPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-20 text-center">
          <h1 className="text-4xl font-semibold text-white">Launch in minutes</h1>
          <p className="text-base text-slate-300">
            Follow the guided setup to configure billing, upload training audio, request voice clones, and invite your team.
          </p>
          <Link
            href="/onboarding/start"
            className="mx-auto rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
          >
            Begin guided onboarding
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-5xl space-y-6 px-6 py-16">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="glass flex items-start gap-6 rounded-2xl border border-slate-800/60 p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-sm font-semibold text-brand-100">
              {idx + 1}
            </span>
            <div className="space-y-2 text-left">
              <h2 className="text-lg font-semibold text-white">{step.title}</h2>
              <p className="text-sm text-slate-300">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-white">Need help getting started?</h2>
          <p className="text-sm text-slate-300">
            Our solutions engineers can migrate existing projects, set up enterprise SSO, and plan dubbing pipelines in a personalized onboarding call.
          </p>
          <Link
            href="/contact/sales"
            className="mx-auto rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
          >
            Book onboarding session
          </Link>
        </div>
      </section>
    </div>
  );
}
