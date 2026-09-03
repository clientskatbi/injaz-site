import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { professionalServiceSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Analytics } from "@/components/Analytics";
import "@/styles/globals.css";

/* الخطوط تُستضاف ذاتياً وقت البناء — لا طلب حاجب للعرض إلى Google */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-arabic",
});

const latin = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  category: "خدمات قانونية",
};

export const viewport: Viewport = {
  themeColor: "#12243f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-navy-900 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          تخطَّ إلى المحتوى
        </a>

        <JsonLd data={[professionalServiceSchema(), websiteSchema()]} />

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <Analytics />
      </body>
    </html>
  );
}
