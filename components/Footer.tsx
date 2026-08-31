import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f3ea]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17352d] text-xs font-bold tracking-wide text-white">
              AM
            </span>
            <div>
              <span className="block text-sm font-extrabold tracking-[0.08em] text-[#17352d]">{siteConfig.shortName}</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8b6b42]">Learning Network</span>
            </div>
          </div>
          <p className="mt-5 max-w-lg text-sm leading-6 text-stone-600">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-700">
            <li><Link className="hover:text-[#17352d]" href="/need-a-tutor">Find a Tutor</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/become-a-tutor">Become a Tutor</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/study-material">Notes, Books & PYQs</Link></li>
            <li><Link className="hover:text-[#17352d]" href="/about">About ALIG MINDS</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6b42]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-stone-700">
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.address}</li>
            <li>
              <a
                className="font-semibold text-[#17352d] hover:underline"
                href={whatsappLink("Hello ALIG MINDS, I have a query and would like to speak with your team.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-stone-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={siteConfig.social.instagram} className="hover:text-[#17352d]">Instagram</a>
            <a href={siteConfig.social.facebook} className="hover:text-[#17352d]">Facebook</a>
            <a href={siteConfig.social.youtube} className="hover:text-[#17352d]">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
