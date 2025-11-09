import { ApiReference } from "@/components/studio/api-reference";

export const metadata = {
  title: "API & SDK | Aural Forge",
  description: "Integrate ultra-realistic voice, dubbing, and transcription into your apps via REST API and SDKs."
};

export default function ApiPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-20">
          <h1 className="text-4xl font-semibold text-white">API & SDK</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Generate voices, transcribe speech, orchestrate dubbing, and manage voice clones programmatically. Every endpoint ships with webhook events, rate limits, and granular API keys scoped per project.
          </p>
        </div>
      </section>
      <ApiReference />
    </div>
  );
}
