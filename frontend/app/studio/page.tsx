import { StudioTimeline } from "@/components/studio/studio-timeline";
import { VoiceSelector } from "@/components/studio/voice-selector";
import { AssetLibrary } from "@/components/studio/asset-library";

export const metadata = {
  title: "Studio | Aural Forge",
  description: "Create multi-track productions, assign voices, and export masters."
};

export default function StudioPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-16">
          <h1 className="text-3xl font-semibold text-white">Studio workspace</h1>
          <p className="text-sm text-slate-300">
            Build multi-track sessions with cloned or stock voices, music beds, and SFX. This UI connects to backend job orchestration for rendering.
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1fr_0.4fr]">
        <div className="space-y-6">
          <VoiceSelector />
          <StudioTimeline />
        </div>
        <AssetLibrary />
      </div>
    </div>
  );
}
