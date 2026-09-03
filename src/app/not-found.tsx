import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { CallButton, WhatsAppButton } from "@/components/Buttons";

export const metadata: Metadata = {
  title: { absolute: "الصفحة غير موجودة | مكتب إنجاز العين" },
  description:
    "الصفحة المطلوبة غير موجودة. تصفّح فئات خدمات مكتب إنجاز العين لتخليص المعاملات في العين، أو تواصل معنا مباشرةً على 0543103028.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="shell py-20 text-center lg:py-28">
      <p className="text-[3.5rem] font-bold leading-none text-gold-500">
        <bdi className="ltr">404</bdi>
      </p>
      <h1 className="mt-4 text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold">الصفحة غير موجودة</h1>
      <p className="mx-auto mt-4 max-w-lg leading-[1.85] text-ink-600">
        ربما تغيّر رابط الصفحة أو حُذفت. يمكنك تصفّح فئات خدماتنا أدناه، أو التواصل معنا مباشرةً.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <CallButton />
        <WhatsAppButton />
      </div>
      <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <Link key={c.slug} href={`/services/${c.slug}/`}
            className="rounded-[14px] border border-line bg-white px-5 py-4 font-semibold text-navy-900 no-underline hover:border-gold-500/45 hover:bg-surface">
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
