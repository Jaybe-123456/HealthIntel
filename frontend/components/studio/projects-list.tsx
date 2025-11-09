const projects = [
  {
    name: "Creator Daily Podcast",
    type: "Studio",
    updated: "2 hours ago",
    status: "Active"
  },
  {
    name: "Global Launch Dubbing",
    type: "Dubbing",
    updated: "6 hours ago",
    status: "Review"
  },
  {
    name: "Support Bot Voice",
    type: "Conversational",
    updated: "1 day ago",
    status: "Testing"
  },
  {
    name: "French Audiobook",
    type: "Studio",
    updated: "3 days ago",
    status: "Completed"
  }
];

export function ProjectsList() {
  return (
    <aside className="glass h-full rounded-2xl border border-slate-800/60 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Projects</h2>
        <button className="rounded-lg border border-brand-500/40 px-3 py-1 text-xs font-semibold text-brand-100 transition hover:bg-brand-500/10">
          New project
        </button>
      </div>
      <ul className="mt-6 space-y-4">
        {projects.map((project) => (
          <li key={project.name} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between text-sm text-slate-200">
              <p className="font-semibold text-white">{project.name}</p>
              <span className="text-xs text-slate-500">{project.updated}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{project.type}</span>
              <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-1 text-brand-100">
                {project.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
