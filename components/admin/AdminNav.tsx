"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions";

const links = [
  { href: "/admin", label: "Overview", icon: "🏠" },
  { href: "/admin/enquiries", label: "Tutor Enquiries", icon: "📥" },
  { href: "/admin/tutors", label: "Tutor Registrations", icon: "👨‍🏫" },
  { href: "/admin/students", label: "Students", icon: "🎓" },
  { href: "/admin/courses", label: "Courses", icon: "📚" },
  { href: "/admin/material", label: "Study Material", icon: "📄" },
  { href: "/admin/tests", label: "Mock Tests", icon: "⏱️" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-200 bg-white md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </span>
          <span className="font-extrabold text-slate-900">Admin</span>
        </Link>
        <form action={signOut}>
          <button className="text-xs text-slate-400 hover:text-red-500">Log out</button>
        </form>
      </div>
      <nav className="flex overflow-x-auto gap-1 px-2 pb-2 md:flex-col md:pb-4">
        {links.map((l) => {
          const active =
            l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
