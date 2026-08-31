import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="border-b border-stone-200 bg-[#f7f3ea]">
      <Container className="py-14 text-center sm:py-20">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6b42]">{eyebrow}</p>}
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-[-0.04em] text-[#17352d] sm:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-600">{subtitle}</p>}
      </Container>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8b6b42]">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-8 text-stone-600">{subtitle}</p>}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "whatsapp"; className?: string }) {
  const styles = variant === "primary"
    ? "bg-[#17352d] text-white hover:bg-[#24493f]"
    : variant === "whatsapp"
      ? "bg-[#1f6f55] text-white hover:bg-[#185b46]"
      : "border border-[#17352d]/25 text-[#17352d] hover:border-[#17352d]";
  return <Link href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles} ${className}`}>{children}</Link>;
}
