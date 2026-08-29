import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-slate-50 py-24 text-center">
      <div className="mx-auto max-w-md">
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page nahi mili</h1>
        <p className="mt-2 text-slate-600">Jo page aap dhoondh rahe hain woh nahi mila.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Home par jayein
        </Link>
      </div>
    </section>
  );
}
