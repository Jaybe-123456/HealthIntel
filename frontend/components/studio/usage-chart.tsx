export function UsageChart() {
  return (
    <div className="glass rounded-2xl border border-slate-800/60 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Credits usage</h2>
          <p className="text-xs text-slate-400">Last 30 days</p>
        </div>
        <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-100">
          82% capacity
        </span>
      </div>
      <div className="mt-6 h-48 rounded-xl border border-slate-800 bg-slate-950/50" />
      <div className="mt-6 grid grid-cols-2 gap-6 text-xs text-slate-300">
        <div>
          <p className="text-slate-400">TTS minutes</p>
          <p className="text-base font-semibold text-white">412</p>
        </div>
        <div>
          <p className="text-slate-400">Dubbing segments</p>
          <p className="text-base font-semibold text-white">126</p>
        </div>
        <div>
          <p className="text-slate-400">Conversational minutes</p>
          <p className="text-base font-semibold text-white">221</p>
        </div>
        <div>
          <p className="text-slate-400">Music renders</p>
          <p className="text-base font-semibold text-white">74</p>
        </div>
      </div>
    </div>
  );
}
