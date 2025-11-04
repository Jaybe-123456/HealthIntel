import { UsageChart } from "@/components/studio/usage-chart";
import { JobsTable } from "@/components/studio/jobs-table";
import { ProjectsList } from "@/components/studio/projects-list";

export const metadata = {
  title: "Dashboard | Aural Forge",
  description: "Monitor credits, jobs, and projects across your workspace."
};

export default function DashboardPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-16">
          <h1 className="text-3xl font-semibold text-white">Workspace dashboard</h1>
          <p className="text-sm text-slate-300">
            Live overview of credits, queue status, recent jobs, and team activity. Data is hydrated via secure API calls once authenticated.
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <UsageChart />
          <JobsTable />
        </div>
        <ProjectsList />
      </div>
    </div>
  );
}
