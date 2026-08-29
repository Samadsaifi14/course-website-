import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              A
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {siteConfig.shortName}
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link className="hover:text-brand-600" href="/tuition">Home Tuition</Link></li>
            <li><Link className="hover:text-brand-600" href="/tuition">Online Tuition</Link></li>
            <li><Link className="hover:text-brand-600" href="/courses">Courses</Link></li>
            <li><Link className="hover:text-brand-600" href="/mock-tests">Mock Tests</Link></li>
            <li><Link className="hover:text-brand-600" href="/study-material">Study Material</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.address}</li>
            <li>
              <a
                className="font-medium text-green-600 hover:underline"
                href={whatsappLink("Namaste! Mujhe ALIG MINDS ke baare mein jaanna hai.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={siteConfig.social.instagram} className="hover:text-brand-600">Instagram</a>
            <a href={siteConfig.social.facebook} className="hover:text-brand-600">Facebook</a>
            <a href={siteConfig.social.youtube} className="hover:text-brand-600">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
