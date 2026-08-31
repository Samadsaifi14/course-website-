import Link from "next/link";
import { Container } from "@/components/ui";
import { whatsappLink } from "@/lib/site";
import { getPublishedMaterial } from "@/lib/queries";

const services = [
  {
    number: "01",
    title: "Find the Right Tutor",
    description:
      "Share your child's class, subjects, location and learning needs. Our team will review the requirement and help connect you with a suitable tutor.",
    href: "/need-a-tutor",
    action: "Submit a tutor requirement",
  },
  {
    number: "02",
    title: "Become a Tutor",
    description:
      "Join the ALIG MINDS tutor network, share your teaching profile and become discoverable for relevant student requirements.",
    href: "/become-a-tutor",
    action: "Register as a tutor",
    note: "Registration fee: ₹100",
  },
  {
    number: "03",
    title: "Entrance & Board Preparation",
    description:
      "Get personal guidance for AMU, JMI, school entrance examinations, undergraduate entrances and board preparation through WhatsApp.",
    href: whatsappLink(
      "Hello ALIG MINDS, I would like to know more about entrance or board examination preparation."
    ),
    action: "Chat on WhatsApp",
    note: "Online preparation from ₹800/month",
    external: true,
  },
];

const preparationAreas = [
  "AMU Entrance",
  "JMI Entrance",
  "Class 6 Entrance",
  "Class 9 Entrance",
  "Class 11 Entrance",
  "B.A. & Undergraduate Entrances",
  "B.A. (Foreign Languages)",
  "B.A. LL.B.",
  "CUET",
  "NEET",
  "Board Examination Preparation",
];

const materialCategories = [
  { title: "Entrance Notes", label: "Focused revision material" },
  { title: "Previous Year Questions", label: "Exam-oriented PYQ collections" },
  { title: "Practice Material", label: "Structured practice for preparation" },
  { title: "Books & Study PDFs", label: "Digital resources for self-study" },
];

export default async function HomePage() {
  const material = await getPublishedMaterial();

  return (
    <>
      <section className="overflow-hidden border-b border-stone-200 bg-[#f7f3ea]">
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] border-l border-stone-200 lg:block" />
          <div className="pointer-events-none absolute right-12 top-12 hidden text-[11rem] font-black leading-none tracking-[-0.08em] text-[#17352d]/[0.035] lg:block">
            AM
          </div>

          <div className="relative grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#7a5b32]">
                ALIG MINDS Learning Network
              </p>
              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#17352d] sm:text-6xl lg:text-8xl">
                Connecting students with the right tutors.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-650 text-stone-600 sm:text-xl">
                Tutor matching, preparation guidance and reliable study material in one focused learning network built for students and families.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/need-a-tutor"
                  className="inline-flex items-center justify-center rounded-full bg-[#17352d] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24493f]"
                >
                  Find a Tutor
                </Link>
                <Link
                  href="/become-a-tutor"
                  className="inline-flex items-center justify-center rounded-full border border-[#17352d]/25 px-6 py-3.5 text-sm font-semibold text-[#17352d] transition hover:border-[#17352d]"
                >
                  Become a Tutor
                </Link>
                <a
                  href={whatsappLink("Hello ALIG MINDS, I have a query and would like to speak with your team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#17352d]/25 px-6 py-3.5 text-sm font-semibold text-[#17352d] transition hover:border-[#17352d]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:pl-10">
              <div className="border-t border-[#17352d]/25 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a5b32]">Built around real needs</p>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-3xl font-semibold text-[#17352d]">Tutor matching</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">Share the requirement. We help you find the right fit.</p>
                  </div>
                  <div className="border-t border-stone-300 pt-5">
                    <p className="text-3xl font-semibold text-[#17352d]">Preparation enquiries</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">AMU, JMI, entrances and boards handled directly on WhatsApp.</p>
                  </div>
                  <div className="border-t border-stone-300 pt-5">
                    <p className="text-3xl font-semibold text-[#17352d]">Digital study material</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">Notes, PYQs, practice material and study PDFs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a5b32]">What we do</p>
              <h2 className="mt-4 max-w-sm font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d] sm:text-5xl">
                A simpler way to get the academic support you need.
              </h2>
            </div>
            <div className="border-t border-stone-300">
              {services.map((service) => {
                const content = (
                  <div className="group grid gap-5 border-b border-stone-300 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-start">
                    <span className="text-sm font-semibold text-[#9a7a4e]">{service.number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#17352d]">{service.title}</h3>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">{service.description}</p>
                      {service.note && <p className="mt-3 text-sm font-semibold text-[#7a5b32]">{service.note}</p>}
                    </div>
                    <span className="text-sm font-semibold text-[#17352d] transition group-hover:translate-x-1">
                      {service.action} →
                    </span>
                  </div>
                );

                return service.external ? (
                  <a key={service.title} href={service.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link key={service.title} href={service.href}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#17352d] py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d6bd92]">Entrance & Board Preparation</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                Preparation support without a complicated course platform.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
                There is no lecture marketplace or course-purchase system. Interested students can speak directly with the ALIG MINDS team to understand the right preparation option.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappLink("Hello ALIG MINDS, I am looking for AMU, JMI, entrance or board examination preparation. Please share the details.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#f2dfbd] px-6 py-3.5 text-sm font-bold text-[#17352d] transition hover:bg-white"
                >
                  Chat with us on WhatsApp
                </a>
                <span className="text-sm font-medium text-stone-300">Online preparation from ₹800/month</span>
              </div>
            </div>

            <div className="border-t border-white/25">
              {preparationAreas.map((item) => (
                <div key={item} className="border-b border-white/20 py-4 text-base font-medium text-stone-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f3ea] py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a5b32]">ALIG MINDS Notes / Books / PYQs</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-[-0.04em] text-[#17352d] sm:text-6xl">
                Prepare better with focused study material.
              </h2>
            </div>
            <Link href="/study-material" className="text-sm font-bold text-[#17352d] hover:underline">
              Browse all study material →
            </Link>
          </div>

          <div className="grid gap-px bg-stone-300 sm:grid-cols-2 lg:grid-cols-4">
            {materialCategories.map((category, index) => (
              <div key={category.title} className="bg-[#f7f3ea] p-7 sm:min-h-52">
                <p className="text-xs font-bold text-[#9a7a4e]">0{index + 1}</p>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.02em] text-[#17352d]">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{category.label}</p>
              </div>
            ))}
          </div>

          {material.length > 0 && (
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {material.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href="/study-material"
                  className="group border border-stone-300 bg-white p-6 transition hover:border-[#17352d]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7a4e]">Digital PDF</span>
                    <span className="text-sm font-bold text-[#17352d]">{item.is_free ? "Free" : `₹${item.price}`}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-[#17352d] group-hover:underline">{item.title}</h3>
                  <p className="mt-2 text-sm text-stone-600">{item.subject || "Study Material"}{item.year ? ` · ${item.year}` : ""}</p>
                  <p className="mt-6 text-sm font-semibold text-[#17352d]">View details and buy PDF →</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 border-y border-stone-300 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a5b32]">Need help choosing?</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] text-[#17352d] sm:text-5xl">
                Tell us what you are preparing for.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                Whether you need a home tutor, entrance preparation guidance or the right study material, the ALIG MINDS team can help you choose the next step.
              </p>
            </div>
            <a
              href={whatsappLink("Hello ALIG MINDS, I need help choosing the right tutor, preparation option or study material.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#17352d] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24493f]"
            >
              Start a WhatsApp conversation
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
