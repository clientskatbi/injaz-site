import type { Metadata } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";
import { servicesByCategory, allServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/Cards";
import { AnswerBox } from "@/components/AnswerBox";
import { CtaCard } from "@/components/CtaCard";

export const metadata: Metadata = {
  title: "كل خدمات تخليص المعاملات في العين",
  description:
    "قائمة خدمات مكتب إنجاز العين كاملة: عقود الزواج والمأذون، الوكالات وكاتب العدل، الإقرارات وحصر الإرث، طلبات النيابة والمحاكم، الغرامات وفك حجز المركبات.",
  alternates: { canonical: "/services/" },
};

const crumbs = [
  { name: "الرئيسية", href: "/" },
  { name: "خدماتنا", href: "/services/" },
];

export default function ServicesIndex() {
  const total = allServices().length;

  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold">خدمات مكتب إنجاز العين</h1>

      <AnswerBox>
        يقدّم مكتب إنجاز العين {total} خدمة لتخليص المعاملات في العين، موزّعة على أربع فئات:
        عقود الزواج والمأذون الشرعي، وكاتب العدل والوكالات والإقرارات، والنيابات والبلاغات
        والشكاوى، والمحاكم والدعاوى والأحوال الشخصية. نجهّز الطلب ونقدّمه ونتابعه نيابةً عنك.
      </AnswerBox>

      {categories.map((cat) => {
        const docs = servicesByCategory(cat.slug);
        if (!docs.length) return null;
        return (
          <section key={cat.slug} className="mt-14">
            <h2 className="mb-1.5 text-[1.5rem] font-bold">
              <a href={`/services/${cat.slug}/`} className="no-underline hover:underline">{cat.title}</a>
            </h2>
            <p className="mb-6 max-w-3xl leading-[1.85] text-ink-600">{cat.answer}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((d) => (
                <ServiceCard key={d.slug} doc={d} categorySlug={cat.slug} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-16">
        <CtaCard message={`السلام عليكم، أريد الاستفسار عن خدمات ${site.name}`} />
      </div>
    </div>
  );
}
