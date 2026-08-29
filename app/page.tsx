import Link from "next/link";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import { whatsappLink } from "@/lib/site";
import { getPublishedCourses, getPublishedMaterial, getPublishedTests } from "@/lib/queries";

const tuitionFeatures = [
  { title: "Home Tuition", desc: "Ghar par aur aapke schedule ke hisaab se qualified tutor.", href: "/tuition" },
  { title: "Online Tuition", desc: "Kahi bhi, kabhi bhi — live online classes.", href: "/tuition" },
  { title: "Mock Tests", desc: "Real exam pattern ke timed mock tests.", href: "/mock-tests" },
  { title: "Study Material", desc: "PYQs aur curated study material ek jagah.", href: "/study-material" },
];

export default async function HomePage() {
  const [courses, material, tests] = await Promise.all([
    getPublishedCourses(),
    getPublishedMaterial(),
    getPublishedTests(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Tuition · Courses · Mock Tests · Study Material
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Ghar baithe padhai,{" "}
              <span className="text-brand-600">expert tutors</span> aur ek smart learning network.
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              ALIG MINDS aapko jodta hai qualified tutors, courses, mock tests aur PYQs se — sab ek hi jagah.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/need-a-tutor">Need a Tutor</ButtonLink>
              <ButtonLink href="/become-a-tutor" variant="secondary">Become a Tutor</ButtonLink>
              <ButtonLink href={whatsappLink()} variant="whatsapp">
                WhatsApp karein
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* What we offer */}
      <section className="bg-white py-16">
        <Container>
          <SectionTitle
            eyebrow="What we offer"
            title="Sab kuch ek smart network mein"
            subtitle="Tuition se lekar tests aur study material — teeno cheezein ek hi platform par."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tuitionFeatures.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group rounded-2xl border border-slate-200 p-6 transition hover:border-brand-300 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Courses */}
      <section className="bg-slate-50 py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionTitle center={false} eyebrow="Courses" title="Popular courses" />
            <Link href="/courses" className="hidden shrink-0 text-sm font-semibold text-brand-600 hover:underline sm:block">
              View all →
            </Link>
          </div>
          {courses.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {c.subject || "Course"}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {c.is_free ? "FREE" : `₹${c.price}`}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-600">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{c.class || ""}</p>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-slate-500">
              Courses jald aane wale hain. Abhi &quot;Need a Tutor&quot; form bharein ya WhatsApp par baat karein.
            </p>
          )}
        </Container>
      </section>

      {/* Mock tests + material */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle center={false} eyebrow="Mock Tests" title="Practice karo, pattern se" />
              {tests.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {tests.map((t) => (
                    <li key={t.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{t.title}</span>
                        <span className="text-xs text-slate-500">
                          {t.class || ""} · {t.duration_minutes} min
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-slate-500">Mock tests jald aa rahe hain.</p>
              )}
              <Link href="/mock-tests" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
                Explore mock tests →
              </Link>
            </div>

            <div>
              <SectionTitle center={false} eyebrow="Study Material" title="PYQs &amp; notes" />
              {material.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {material.map((m) => (
                    <li key={m.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{m.title}</span>
                        <span className={`text-sm font-bold ${m.is_free ? "text-green-600" : "text-slate-900"}`}>
                          {m.is_free ? "FREE" : `₹${m.price}`}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{m.subject || ""} {m.year ? `· ${m.year}` : ""}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-slate-500">Study material jald aa raha hai.</p>
              )}
              <Link href="/study-material" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
                View study material →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-700 py-16">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            Tutor chahiye? Ya koi student ki zaroorat hai?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-brand-100">
            Hamari team aapko sahi tutor se jod degi — ya aap tutor register karein.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/need-a-tutor"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              Need a Tutor
            </Link>
            <Link
              href="/become-a-tutor"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Become a Tutor
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
