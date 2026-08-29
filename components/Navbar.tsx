"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tuition", label: "Tuition" },
  { href: "/courses", label: "Courses" },
  { href: "/mock-tests", label: "Mock Tests" },
  { href: "/study-material", label: "Study Material" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            {siteConfig.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/need-a-tutor"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Need a Tutor
          </Link>
          <Link
            href="/become-a-tutor"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600"
          >
            Become a Tutor
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-slate-600 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/need-a-tutor"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Need a Tutor
            </Link>
            <Link
              href="/become-a-tutor"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
