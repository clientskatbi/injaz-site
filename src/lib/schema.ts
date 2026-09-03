import { site } from "./site";
import type { ServiceDoc } from "./content";
import type { Category } from "./categories";

const abs = (p: string) => new URL(p, site.url).toString();

/** الكيان الأساسي — يُشار إليه من كل صفحة عبر @id */
export const orgId = `${site.url}/#organization`;
export const siteId = `${site.url}/#website`;

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: site.name,
    alternateName: site.nameEn,
    description: site.description,
    url: abs("/"),
    telephone: site.phoneIntl,
    image: abs("/og-image.png"),
    priceRange: "$$",
    currenciesAccepted: "AED",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    areaServed: [
      { "@type": "City", name: "العين" },
      { "@type": "AdministrativeArea", name: "إمارة أبوظبي" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneIntl,
      contactType: "customer service",
      availableLanguage: ["ar", "en"],
      areaServed: "AE",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    url: abs("/"),
    name: site.name,
    inLanguage: "ar-AE",
    publisher: { "@id": orgId },
  };
}

export function offerCatalogSchema(cats: Category[], services: { slug: string; title: string; category: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `خدمات ${site.name}`,
    itemListElement: cats.map((cat, i) => ({
      "@type": "OfferCatalog",
      position: i + 1,
      name: cat.title,
      url: abs(`/services/${cat.slug}/`),
      itemListElement: services
        .filter((s) => s.category === cat.slug)
        .map((s, j) => ({
          "@type": "Offer",
          position: j + 1,
          itemOffered: {
            "@type": "Service",
            name: s.title,
            url: abs(`/services/${cat.slug}/${s.slug}/`),
            provider: { "@id": orgId },
            areaServed: { "@type": "City", name: "العين" },
          },
        })),
    })),
  };
}

export interface Crumb { name: string; href: string }

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

export function articleSchema(doc: ServiceDoc, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.data.title,
    description: doc.data.metaDescription,
    abstract: doc.data.answer,
    inLanguage: "ar-AE",
    url: abs(url),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(url) },
    datePublished: doc.data.updated,
    dateModified: doc.data.updated,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    about: doc.data.secondaryKeywords,
    keywords: [doc.data.keyword, ...doc.data.secondaryKeywords].join("، "),
    isAccessibleForFree: true,
  };
}

export function howToSchema(doc: ServiceDoc, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `خطوات ${doc.data.title}`,
    description: doc.data.answer,
    inLanguage: "ar-AE",
    totalTime: "PT1H",
    step: doc.data.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${abs(url)}#steps`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(doc: ServiceDoc, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: doc.data.title,
    description: doc.data.metaDescription,
    serviceType: doc.data.keyword,
    url: abs(url),
    provider: { "@id": orgId },
    areaServed: { "@type": "City", name: "العين" },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: site.phoneIntl,
      serviceUrl: abs(url),
      serviceLocation: {
        "@type": "Place",
        name: site.name,
        address: site.address.full,
      },
    },
  };
}
