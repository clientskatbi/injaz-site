import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";
import { allServices } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => new URL(p, site.url).toString();

  const statics: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/services/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/how-it-works/"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/articles/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: abs("/contact/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const hubs: MetadataRoute.Sitemap = categories.map((c) => ({
    url: abs(`/services/${c.slug}/`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const pages: MetadataRoute.Sitemap = allServices().map((s) => ({
    url: abs(`/services/${s.category}/${s.slug}/`),
    lastModified: new Date(s.data.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...statics, ...hubs, ...pages];
}
