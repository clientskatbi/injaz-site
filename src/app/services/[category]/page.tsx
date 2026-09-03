import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, categoryBySlug } from "@/lib/categories";
import { servicesByCategory } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/Cards";
import { AnswerBox } from "@/components/AnswerBox";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaCard } from "@/components/CtaCard";
import { ArrowIcon } from "@/components/Icons";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) return {};
  return {
    title: { absolute: cat.metaTitle },
    description: cat.metaDescription,
    alternates: { canonical: `/services/${cat.slug}/` },
    openGraph: { title: cat.metaTitle, description: cat.metaDescription, url: `/services/${cat.slug}/` },
  };
}

export default async function CategoryHub({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) notFound();

  const docs = servicesByCategory(cat.slug);
  const others = categories.filter((c) => c.slug !== cat.slug);

  const crumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "خدماتنا", href: "/services/" },
    { name: cat.shortTitle, href: `/services/${cat.slug}/` },
  ];

  /** أسئلة الفئة مبنية من الخدمات نفسها — لا محتوى مكرّر */
  const faqs = docs.slice(0, 4).map((d) => ({
    q: d.data.faqs[0].q,
    a: d.data.faqs[0].a,
  }));

  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd data={[breadcrumbSchema(crumbs), ...(faqs.length >= 3 ? [faqSchema(faqs)] : [])]} />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="max-w-4xl text-[clamp(1.9rem,4vw,2.6rem)] font-bold">
        {cat.title} في العين
      </h1>

      <AnswerBox>{cat.answer}</AnswerBox>

      <section className="mt-12">
        <h2 className="mb-6 text-[1.5rem] font-bold">خدمات هذه الفئة</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <ServiceCard key={d.slug} doc={d} categorySlug={cat.slug} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-2 text-[1.5rem] font-bold">مقارنة سريعة بين خدمات الفئة</h2>
        <p className="mb-4 text-ink-600">
          المستندات الأساسية المشتركة، مع ملاحظة أن كل معاملة قد تتطلّب مستندات إضافية بحسب الحالة.
        </p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">الخدمة</th>
                <th scope="col">أبرز ما تحتاجه</th>
                <th scope="col">التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.slug}>
                  <th scope="row" className="font-semibold text-navy-900">{d.data.title}</th>
                  <td className="text-ink-600">{d.data.steps[0].name}</td>
                  <td>
                    <Link href={`/services/${cat.slug}/${d.slug}/`}
                      className="inline-flex items-center gap-1.5 font-semibold text-gold-800 hover:underline">
                      اطّلع
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {faqs.length >= 3 && <FaqAccordion faqs={faqs} heading={`أسئلة شائعة عن ${cat.shortTitle}`} />}

      <div className="mt-14">
        <CtaCard message={`السلام عليكم، أحتاج خدمة ضمن ${cat.title}`} />
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.35rem] font-bold">فئات أخرى</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {others.map((c) => (
            <Link key={c.slug} href={`/services/${c.slug}/`}
              className="flex items-center justify-between gap-3 rounded-[14px] border border-line bg-white px-5 py-4 font-semibold text-navy-900 no-underline hover:border-gold-500/45 hover:bg-surface">
              {c.shortTitle}
              <ArrowIcon className="h-4 w-4 text-gold-600" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
