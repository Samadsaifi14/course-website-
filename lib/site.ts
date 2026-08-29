export const siteConfig = {
  name: "ALIG MINDS Learning Network",
  shortName: "ALIG MINDS",
  tagline: "Ghar baithe padhai, expert tutors aur ek smart learning network.",
  description:
    "ALIG MINDS connects students with qualified home/online tutors, courses, mock tests and study material — sab ek jagah.",
  url: "https://aligminds.in",
  // WhatsApp number in international format, digits only
  whatsappNumber: "919999999999",
  // Contact / owner details (Samad)
  contact: {
    email: "hello@aligminds.in",
    phone: "+91 99999 99999",
    address: "Your City, India",
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
