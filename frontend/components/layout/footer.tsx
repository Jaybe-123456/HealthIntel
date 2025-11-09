import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Overview", href: "/#platform" },
    { name: "Studio", href: "/studio" },
    { name: "Conversational AI", href: "/conversational" },
    { name: "Security", href: "/security" }
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" }
  ],
  Resources: [
    { name: "Docs", href: "/api" },
    { name: "Status", href: "https://status.auralforge.ai" },
    { name: "Community", href: "/community" }
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "DPA", href: "/legal/dpa" }
  ]
} as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-5 lg:px-12">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-100">
            <span className="h-8 w-8 rounded-xl bg-brand-500/20 p-2 text-brand-400">🎶</span>
            Aural Forge
          </div>
          <p className="max-w-sm text-slate-400">
            The unified studio for voice, dubbing, music, and conversational AI. Ultra-human
            synthesis with enterprise-grade compliance.
          </p>
        </div>
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">{section}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="transition hover:text-slate-100">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Aural Forge Labs Inc. All rights reserved.
      </div>
    </footer>
  );
}
