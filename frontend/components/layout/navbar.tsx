"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { name: "Platform", href: "#platform" },
  { name: "Studio", href: "/studio" },
  { name: "Pricing", href: "/pricing" },
  { name: "API", href: "/api" },
  { name: "Resources", href: "/onboarding" }
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <span className="h-9 w-9 rounded-xl bg-brand-500/20 p-2 text-brand-400">🎙️</span>
            Aural Forge
          </Link>
          <ul className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition hover:text-slate-50"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
          >
            Sign in
          </Link>
          <Link
            href="/onboarding"
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
          >
            Start free
          </Link>
        </div>
        <button
          className="rounded-lg border border-slate-700 p-2 text-slate-100 lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </nav>
      {mobileOpen ? (
        <div className="space-y-2 border-t border-slate-800 bg-slate-950 px-6 py-4 lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-brand-500/10 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              href="/login"
              className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-center text-sm text-slate-200 transition hover:border-brand-500 hover:text-brand-200"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 rounded-lg bg-brand-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-card transition hover:bg-brand-400"
              onClick={() => setMobileOpen(false)}
            >
              Start free
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
