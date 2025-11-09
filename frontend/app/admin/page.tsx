import { AdminPanels } from "@/components/admin/admin-panels";

export const metadata = {
  title: "Admin Console | Aural Forge",
  description: "Manage seats, compliance, quotas, and audit logs for your workspace."
};

export default function AdminPage() {
  return (
    <div className="bg-slate-950">
      <section className="border-b border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-16">
          <h1 className="text-3xl font-semibold text-white">Admin console</h1>
          <p className="text-sm text-slate-300">
            Configure seat management, enable SSO/SCIM, approve voice cloning requests, and audit activity. Enterprise tenants unlock HIPAA mode and managed dubbing controls.
          </p>
        </div>
      </section>
      <AdminPanels />
    </div>
  );
}
