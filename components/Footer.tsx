import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f3ea]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
        <div>
          <p className="font-serif text-2xl font-semibold text-[#17352d]">{siteConfig.shortName}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">{siteConfig.description}</p>
          <a href={whatsappLink("Hello ALIG MINDS, I have a query and would like to speak with your team.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-[#1f6f55] px-5 py-2.5 text-sm font-semibold text-white">Chat on WhatsApp</a>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-600">
            <li><Link className="hover:text-[#17352d]" href="/need-a-tutor">Find a Tutor</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/become-a-tutor">Become a Tutor</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/preparation">Entrance & Board Preparation</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/study-material">Notes, Books & PYQs</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/dashboard">My Study Library</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-600">
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.address}</li>
            <li><Link className="hover:text-[#17352d]" href="/about">About ALIG MINDS</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-stone-500 sm:flex-row sm:px-6"><p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><p>Tutor matching · Preparation enquiries · Study PDFs</p></div></div>
    </footer>
  );
}
