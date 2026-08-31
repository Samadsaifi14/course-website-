export const siteConfig = {
  name: "ALIG MINDS Learning Network",
  shortName: "ALIG MINDS",
  tagline: "Connecting Students With The Right Tutors",
  description:
    "ALIG MINDS connects families with suitable tutors, supports entrance and board preparation enquiries, and provides focused notes, books and previous-year question PDFs.",
  url: "https://aligminds.in",
  // WhatsApp number in international format, digits only
  whatsappNumber: "919999999999",
  contact: {
    email: "hello@aligminds.in",
    phone: "+91 99999 99999",
    address: "India",
  },
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
};

export function whatsappLink(message?: string): string {
  const num = siteConfig.whatsappNumber;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}
