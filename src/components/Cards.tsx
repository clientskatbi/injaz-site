import Link from "next/link";
import { categoryIcons } from "./Icons";
import { ArrowIcon } from "./Icons";
import type { Category } from "@/lib/categories";
import type { ServiceDoc } from "@/lib/content";

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = categoryIcons[category.icon];
  return (
    <Link
      href={`/services/${category.slug}/`}
      className="group flex flex-col rounded-[14px] border border-line bg-white p-6 no-underline shadow-soft transition-all hover:-translate-y-1 hover:border-gold-500/45 hover:shadow-lift"
    >
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-900 group-hover:text-gold-500">
        <Icon />
      </span>
      <h3 className="mb-2 text-[1.15rem] font-bold text-navy-900">{category.title}</h3>
      <p className="m-0 mb-5 flex-1 text-[0.92rem] leading-[1.8] text-ink-600">
        {category.answer.split("،").slice(0, 2).join("،")}…
      </p>
      <span className="mt-auto flex items-center gap-2 text-[0.88rem] font-semibold text-gold-800">
        {count} خدمات
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}

export function ServiceCard({ doc, categorySlug }: { doc: ServiceDoc; categorySlug: string }) {
  return (
    <Link
      href={`/services/${categorySlug}/${doc.slug}/`}
      className="group flex flex-col rounded-[14px] border border-line bg-white p-5 no-underline transition-all hover:-translate-y-0.5 hover:border-gold-500/45 hover:shadow-soft"
    >
      <h3 className="mb-2 text-[1.02rem] font-bold leading-snug text-navy-900 group-hover:text-navy-700">
        {doc.data.title}
      </h3>
      <p className="m-0 mb-4 flex-1 text-[0.88rem] leading-[1.75] text-ink-500">
        {doc.data.metaDescription.split(".")[0]}.
      </p>
      <span className="mt-auto flex items-center gap-1.5 text-[0.83rem] font-semibold text-gold-800">
        التفاصيل والمستندات
        <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}
