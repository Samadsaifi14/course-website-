import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPaths = ["", "tuition", "courses", "mock-tests", "study-material", "about", "contact", "need-a-tutor", "become-a-tutor"];
  const now = new Date();

  return staticPaths.map((p) => ({
    url: `${base}/${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
}
