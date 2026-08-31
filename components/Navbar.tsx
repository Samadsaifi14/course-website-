"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/need-a-tutor", label: "Find a Tutor" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/study-material", label: "Study Material" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-[#f7f3ea]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17352d]/20 bg-[#17352d] text-xs font-bold tracking-wide text-white">
            AM
          </span>
          <div>
            <span className="block text-sm font-extrabold tracking-[0.08em] text-[#17352d]">
              {siteConfig.shortName}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[#8b6b42] sm:block">
              Learning Network
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-700 transition hover:text-[#17352d]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hello ALIG MINDS, I would like to know more about entrance or board preparation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#17352d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24493f]"
          >
            Preparation Enquiry
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-[#17352d] md:hidden"
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-stone-200 bg-[#f7f3ea] px-4 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-stone-800"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink("Hello ALIG MINDS, I would like to know more about entrance or board preparation.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-[#17352d] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Preparation Enquiry on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
