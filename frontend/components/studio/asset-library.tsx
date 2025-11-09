const assets = [
  {
    name: "Launch Script v3",
    type: "Script",
    size: "24 KB",
    updated: "2h ago"
  },
  {
    name: "Ambient Atmos Loop",
    type: "Music",
    size: "5.2 MB",
    updated: "4h ago"
  },
  {
    name: "Voice Clone Consent",
    type: "Document",
    size: "96 KB",
    updated: "1d ago"
  }
];

export function AssetLibrary() {
  return (
    <aside className="glass h-full rounded-2xl border border-slate-800/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Asset library</h2>
        <button className="rounded-lg border border-brand-500/40 px-3 py-1 text-xs font-semibold text-brand-100 transition hover:bg-brand-500/10">
          Upload
        </button>
      </div>
      <ul className="mt-6 space-y-4">
        {assets.map((asset) => (
          <li key={asset.name} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{asset.name}</span>
              <span className="text-xs text-slate-500">{asset.updated}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{asset.type}</span>
              <span>{asset.size}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl border border-brand-500/40 bg-brand-500/10 p-4 text-xs text-brand-100">
        <p className="font-semibold">Drag & drop</p>
        <p className="mt-2 text-brand-200">
          All uploads are encrypted server-side. HIPAA mode enforces additional retention controls and access audits.
        </p>
      </div>
    </aside>
  );
}
