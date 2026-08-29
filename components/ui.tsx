import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white">
      <Container className="py-12 text-center sm:py-16">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">{subtitle}</p>}
      </Container>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-lg text-slate-600">{subtitle}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "whatsapp";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
      : variant === "whatsapp"
      ? "bg-green-600 text-white hover:bg-green-700 shadow-sm"
      : "border border-slate-300 text-slate-700 hover:border-brand-500 hover:text-brand-600";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
