import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { allServices } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnswerBox } from "@/components/AnswerBox";
import { ServiceCard } from "@/components/Cards";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "أدلّة ومقالات المعاملات في العين",
  description:
    "أدلّة عملية تشرح إجراءات المعاملات في العين: المستندات المطلوبة، الخطوات، المدة المتوقّعة والأخطاء الشائعة — لكل خدمة من خدمات مكتب إنجاز العين.",
  alternates: { canonical: "/articles/" },
};

const crumbs = [
  { name: "الرئيسية", href: "/" },
  { name: "مقالات", href: "/articles/" },
];

export default function ArticlesIndex() {
  const docs = allServices();

  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold">أدلّة المعاملات في العين</h1>

      <AnswerBox>
        يضمّ هذا القسم أدلّة تفصيلية لكل معاملة نقدّمها في العين، ويشرح كل دليل تعريف
        المعاملة والمستندات المطلوبة وخطوات الإنجاز والمدة المتوقّعة والأخطاء الشائعة
        التي تؤخّر الطلب، مع إجابات عن أكثر الأسئلة تكراراً.
      </AnswerBox>

      <div className="mt-10 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <Link key={c.slug} href={`/services/${c.slug}/`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.88rem] font-medium text-navy-800 no-underline hover:border-gold-500/50 hover:bg-surface">
            {c.shortTitle}
            <ArrowIcon className="h-3.5 w-3.5 text-gold-600" />
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => (
          <ServiceCard key={d.slug} doc={d} categorySlug={d.category} />
        ))}
      </div>
    </div>
  );
}
