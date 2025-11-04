const tracks = [
  {
    name: "Narrator - Helena",
    items: [
      { start: 0, label: "Intro", duration: "00:45" },
      { start: 48, label: "Segment A", duration: "02:10" }
    ]
  },
  {
    name: "Guest - Satoshi",
    items: [
      { start: 50, label: "Welcome", duration: "01:05" },
      { start: 120, label: "Story", duration: "02:45" }
    ]
  },
  {
    name: "Music Bed",
    items: [
      { start: 0, label: "Ambient Loop", duration: "05:00" }
    ]
  }
];

export function StudioTimeline() {
  return (
    <div className="glass rounded-2xl border border-slate-800/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Multi-track timeline</h2>
        <div className="flex gap-2 text-xs">
          <button className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-brand-500">
            Split
          </button>
          <button className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-brand-100 transition hover:bg-brand-500/20">
            Render preview
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {tracks.map((track) => (
          <div key={track.name} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{track.name}</span>
              <span>Track gain +0.0dB</span>
            </div>
            <div className="relative h-20 rounded-xl border border-slate-800 bg-slate-950/70">
              {track.items.map((item) => (
                <div
                  key={`${track.name}-${item.label}`}
                  className="absolute top-2 flex h-16 w-40 flex-col justify-between rounded-lg border border-brand-500/40 bg-brand-500/10 p-3 text-xs text-brand-100"
                  style={{ left: `${item.start / 2}%` }}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-200">
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
