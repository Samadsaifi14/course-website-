"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/need-a-tutor", label: "Find a Tutor" },
  { href: "/become-a-tutor", label: "Become a Tutor" },
  { href: "/preparation", label: "Preparation" },
  { href: "/study-material", label: "Study Material" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-[#fbf9f4]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center border border-[#17352d] bg-[#17352d] font-serif text-sm font-bold text-white">AM</span>
          <span><span className="block text-base font-extrabold tracking-[-0.02em] text-[#17352d]">{siteConfig.shortName}</span><span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500 sm:block">Learning Network</span></span>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-stone-600 transition hover:text-[#17352d]">{link.label}</Link>)}
          <Link href="/dashboard" className="text-sm font-medium text-stone-600 transition hover:text-[#17352d]">My Library</Link>
          <a href={whatsappLink("Hello ALIG MINDS, I would like to know more about entrance or board preparation.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#17352d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24493f]">WhatsApp Enquiry</a>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-md p-2 text-[#17352d] lg:hidden" aria-label="Toggle menu"><svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}</svg></button>
      </nav>
      {open && <div className="border-t border-stone-200 bg-[#fbf9f4] px-4 py-5 lg:hidden"><div className="flex flex-col gap-4">{navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium text-stone-700">{link.label}</Link>)}<Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-stone-700">My Study Library</Link><a href={whatsappLink("Hello ALIG MINDS, I have a preparation enquiry.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#17352d] px-4 py-3 text-center text-sm font-semibold text-white">Preparation Enquiry on WhatsApp</a></div></div>}
    </header>
  );
}
