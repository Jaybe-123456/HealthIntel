const panels = [
  {
    title: "Seat management",
    description: "Invite teammates, assign roles (Owner, Admin, Editor, Viewer), and allocate credit quotas per seat.",
    actions: ["Bulk invite", "Reassign seat", "Suspend"]
  },
  {
    title: "Compliance",
    description: "Enable HIPAA mode, configure data retention policies, and download signed DPA/BAA documents.",
    actions: ["Enable HIPAA", "Download DPA", "Configure retention"]
  },
  {
    title: "Audit logs",
    description: "Track access to voice clones, exports, billing changes, and admin actions with exportable CSV + API.",
    actions: ["Filter", "Export", "Webhook"]
  },
  {
    title: "Billing",
    description: "Sync Stripe subscriptions, view invoices, manage coupons, and configure metered usage alerts.",
    actions: ["Open Stripe", "Add coupon", "Usage alerts"]
  }
];

export function AdminPanels() {
  return (
    <section className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.title} className="glass rounded-2xl border border-slate-800/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{panel.title}</h2>
              <span className="text-xs text-slate-500">RBAC enforced</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{panel.description}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {panel.actions.map((action) => (
                <button
                  key={action}
                  className="rounded-lg border border-brand-500/40 px-3 py-1 text-brand-100 transition hover:bg-brand-500/10"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
