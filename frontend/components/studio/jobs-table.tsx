const jobs = [
  {
    id: "job_01",
    type: "TTS",
    project: "Weekly Investor Update",
    status: "Completed",
    duration: "3m 24s",
    credits: 120
  },
  {
    id: "job_02",
    type: "Dubbing",
    project: "Product Launch JP",
    status: "Rendering",
    duration: "12m 11s",
    credits: 480
  },
  {
    id: "job_03",
    type: "STT",
    project: "Customer Support QA",
    status: "Completed",
    duration: "48m 05s",
    credits: 220
  },
  {
    id: "job_04",
    type: "Music",
    project: "Ad Theme Spring",
    status: "Queued",
    duration: "0m 45s",
    credits: 65
  }
];

export function JobsTable() {
  return (
    <div className="glass rounded-2xl border border-slate-800/60 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent jobs</h2>
        <span className="text-xs text-slate-500">Webhook-enabled</span>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
        <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-300">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-slate-500">
              <th className="px-4 py-3 text-left">Job</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Project</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{job.id}</td>
                <td className="px-4 py-3 text-brand-200">{job.type}</td>
                <td className="px-4 py-3 text-slate-200">{job.project}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-1 text-xs text-brand-100">
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-200">{job.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
