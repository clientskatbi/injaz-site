import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allArticles, articleBySlug, relatedServices } from "@/lib/content";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnswerBox } from "@/components/AnswerBox";
import { TableOfContents } from "@/components/TableOfContents";
import { StepsList } from "@/components/StepsList";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaCard } from "@/components/CtaCard";
import { Disclaimer } from "@/components/Disclaimer";
import { Mdx } from "@/components/Mdx";
import { ServiceCard } from "@/components/Cards";
import { ClockIcon, CheckIcon } from "@/components/Icons";

type Params = { slug: string };

export function generateStaticParams() {
  return allArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = articleBySlug(slug);
  if (!doc) return {};
  const url = `/articles/${doc.slug}/`;
  return {
    // absolute: لا نضيف اسم المكتب هنا، فالسطر محدود بـ60 حرفاً
    title: { absolute: doc.data.metaTitle },
    description: doc.data.metaDescription,
    keywords: [doc.data.keyword, ...doc.data.secondaryKeywords, ...doc.data.aliases],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: doc.data.metaTitle,
      description: doc.data.metaDescription,
      url,
      modifiedTime: doc.data.updated,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = articleBySlug(slug);
  if (!doc) notFound();

  const url = `/articles/${doc.slug}/`;
  const related = relatedServices(doc);
  const crumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "مقالات", href: "/articles/" },
    { name: doc.data.title, href: url },
  ];

  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema(doc, url),
          faqSchema(doc.data.faqs),
        ]}
      />

      <Breadcrumbs crumbs={crumbs} />

      <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:order-1 lg:block">
          <TableOfContents items={doc.toc} variant="desktop" />
        </aside>

        <article className="min-w-0 lg:order-2">
          <h1 className="text-[clamp(1.85rem,4vw,2.55rem)] font-bold">{doc.data.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-ink-500">
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              قراءة <bdi className="ltr">{doc.readingMinutes}</bdi> دقائق
            </span>
            <span className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-wa-700" />
              آخر تحديث <bdi className="ltr">{doc.data.updated}</bdi>
            </span>
            {doc.data.aliases.length > 0 && (
              <span>يُعرف أيضاً بـ: {doc.data.aliases.join("، ")}</span>
            )}
          </div>

          <AnswerBox>{doc.data.answer}</AnswerBox>

          <TableOfContents items={doc.toc} variant="mobile" />

          <div className="prose-ar">
            <Mdx source={doc.body} />
          </div>

          <StepsList steps={doc.data.steps} title={`خطوات ${doc.data.title}`} />

          <div className="my-12">
            <CtaCard
              compact
              title={`هل تحتاج مساعدة في ${doc.data.title}؟`}
              body="أرسل لنا تفاصيل حالتك على واتساب، ونخبرك بالمستندات المطلوبة والمدة المتوقّعة قبل حضورك."
              message={`السلام عليكم، أحتاج استفسارًا عن: ${doc.data.title}`}
            />
          </div>

          <FaqAccordion faqs={doc.data.faqs} />

          <Disclaimer updated={doc.data.updated} />

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 text-[1.35rem] font-bold">خدمات ذات صلة</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <ServiceCard key={r.slug} doc={r} categorySlug={r.category} />
                ))}
              </div>
            </section>
          )}

          <p className="mt-10 text-[0.9rem] text-ink-500">
            العودة إلى{" "}
            <Link href="/articles/" className="font-semibold text-gold-800 hover:underline">
              فهرس المقالات
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
