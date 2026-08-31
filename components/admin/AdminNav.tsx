"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Tutor Enquiries" },
  { href: "/admin/tutors", label: "Tutor Registrations" },
  { href: "/admin/material", label: "Study Material" },
  { href: "/admin/students", label: "Customers" },
  { href: "/admin/payments", label: "Payments" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="border-b border-stone-200 bg-[#17352d] text-white md:min-h-screen md:w-64 md:border-b-0 md:border-r md:border-white/10">
      <div className="p-5">
        <Link href="/" className="block"><span className="text-lg font-bold">ALIG MINDS</span><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-stone-300">Admin</span></Link>
        <nav className="mt-7 flex gap-2 overflow-x-auto md:flex-col">
          {links.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-white text-[#17352d]" : "text-stone-200 hover:bg-white/10 hover:text-white"}`}>{link.label}</Link>;
          })}
        </nav>
      </div>
    </aside>
  );
}
