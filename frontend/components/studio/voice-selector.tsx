const voices = [
  {
    id: "v_alto",
    name: "Helena",
    type: "Premium",
    language: "English (US)",
    mood: "Warm"
  },
  {
    id: "v_tenor",
    name: "Satoshi",
    type: "Cloned",
    language: "Japanese",
    mood: "Inspirational"
  },
  {
    id: "v_baroque",
    name: "Camille",
    type: "Creator",
    language: "French",
    mood: "Narrative"
  }
];

export function VoiceSelector() {
  return (
    <div className="glass rounded-2xl border border-slate-800/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Voice palette</h2>
        <button className="rounded-lg border border-brand-500/40 px-3 py-1 text-xs font-semibold text-brand-100 transition hover:bg-brand-500/10">
          Clone voice
        </button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {voices.map((voice) => (
          <div key={voice.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-sm font-semibold text-white">{voice.name}</p>
            <p className="text-xs text-slate-400">{voice.language}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
              <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-0.5 text-brand-100">
                {voice.type}
              </span>
              <span>{voice.mood}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
