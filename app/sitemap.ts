import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/need-a-tutor", "/become-a-tutor", "/preparation", "/study-material", "/about", "/contact"];
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/study-material" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
