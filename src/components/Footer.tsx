import Link from "next/link";
import { site, telLink, waLink } from "@/lib/site";
import { categories } from "@/lib/categories";
import { allServices } from "@/lib/content";
import { PhoneIcon, WhatsAppIcon, PinIcon, ClockIcon } from "./Icons";

/**
 * الفوتر يحمل قائمة الخدمات كاملة — أقوى قناة ربط داخلي في الموقع،
 * فكل صفحة خدمة تحصل على رابط من كل صفحة أخرى.
 */
export function Footer() {
  const services = allServices();

  return (
    <footer className="mt-20 bg-navy-900 pb-24 text-white/75 lg:pb-0">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-lg font-bold text-gold-500">إ</span>
            <span className="text-lg font-bold text-white">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-[1.85]">{site.tagline}. نتابع معاملتك من الطلب حتى الاستلام.</p>

          <div className="mt-6 grid gap-3 text-[0.92rem]">
            <a href={telLink} data-conv="call" className="flex items-center gap-2.5 hover:text-gold-400">
              <PhoneIcon className="h-[18px] w-[18px] text-gold-500" />
              <bdi className="ltr">{site.phone}</bdi>
            </a>
            <a href={waLink()} data-conv="whatsapp" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-gold-400">
              <WhatsAppIcon className="h-[18px] w-[18px] text-wa-500" />
              واتساب
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-gold-400">
              <PinIcon className="mt-1 h-[18px] w-[18px] shrink-0 text-gold-500" />
              <span>{site.address.full}</span>
            </a>
            <span className="flex items-center gap-2.5">
              <ClockIcon className="h-[18px] w-[18px] text-gold-500" />
              {site.hours.label}
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {categories.map((cat) => (
            <nav key={cat.slug} aria-labelledby={`f-${cat.slug}`}>
              <h2 id={`f-${cat.slug}`} className="mb-3 text-[0.95rem] font-bold text-gold-500">
                <Link href={`/services/${cat.slug}/`} className="hover:underline">{cat.title}</Link>
              </h2>
              <ul className="grid gap-2 text-[0.87rem] leading-relaxed">
                {services
                  .filter((s) => s.category === cat.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${cat.slug}/${s.slug}/`} className="hover:text-white hover:underline">
                        {s.data.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-5 text-[0.8rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.</p>
          <p className="m-0 max-w-xl">مكتب خدمات خاص — لسنا جهة حكومية ولا تابعين لأي جهة رسمية.</p>
        </div>
      </div>
    </footer>
  );
}
