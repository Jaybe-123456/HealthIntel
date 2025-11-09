import { PricingComparison } from "@/components/sections/pricing-comparison";
import Link from "next/link";

export const metadata = {
  title: "Pricing | Aural Forge",
  description: "Flexible plans for individuals, teams, and enterprises with credits and compliance controls."
};

export default function PricingPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-24 text-center">
          <h1 className="text-4xl font-semibold text-white">Choose a plan that scales with your voice strategy</h1>
          <p className="text-base text-slate-300">
            Compare credits, cloning, concurrency, and compliance add-ons. Metered usage ensures you only pay for what you ship.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/onboarding"
              className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
            >
              Start free
            </Link>
            <Link
              href="/contact/sales"
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
      <PricingComparison />
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Usage-based billing & credits engine</h2>
            <p className="text-sm text-slate-300">
              Credits cover inference minutes, dubbing segments, conversational minutes, and music renders. Track consumption per workspace and seat with exportable logs and webhooks.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• Live usage meters and alerts</p>
            <p>• Overage billing automatically via Stripe</p>
            <p>• Purchase add-on credit packs anytime</p>
            <p>• Exportable CSV, JSON usage analytics</p>
          </div>
        </div>
      </section>
    </div>
  );
}
