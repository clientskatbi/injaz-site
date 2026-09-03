import Link from "next/link";
import type { Metadata } from "next";
import { site, telLink } from "@/lib/site";
import { categories } from "@/lib/categories";
import { allServices, servicesByCategory } from "@/lib/content";
import { faqSchema, offerCatalogSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { CategoryCard, ServiceCard } from "@/components/Cards";
import { CallButton, WhatsAppButton, GhostButton } from "@/components/Buttons";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaCard } from "@/components/CtaCard";
import { ClockIcon, PinIcon, CheckIcon, ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `${site.name}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "هل مكتب إنجاز العين جهة حكومية؟",
    a: "لا. مكتب إنجاز العين مكتب خدمات خاص يتولّى تجهيز معاملاتك وتقديمها ومتابعتها نيابةً عنك لدى الجهات المختصة في العين، ولسنا تابعين لأي جهة رسمية ولا نقدّم استشارات قانونية.",
  },
  {
    q: "ما الفرق بين المكتب والمحامي؟",
    a: "المحامي يترافع عنك ويقدّم الرأي القانوني، بينما يتولّى المكتب الجانب الإجرائي: تجهيز الطلب، صياغته وإدخاله في النظام، دفع الرسوم، ومتابعة المعاملة حتى صدور النتيجة. كثير من المعاملات لا تحتاج محامياً أصلاً.",
  },
  {
    q: "كم تستغرق المعاملة؟",
    a: "الإقرارات والوكالات تُنجز غالباً في نفس اليوم متى اكتملت المستندات. أما المعاملات القضائية كفتح الدعاوى والاستئناف والتنفيذ فترتبط مدتها بجدول الجهة المختصة ونوع الطلب.",
  },
  {
    q: "هل يمكن إنجاز المعاملة دون حضوري؟",
    a: "يعتمد ذلك على نوع المعاملة. بعض الطلبات تحتاج حضورك أو بصمتك شخصياً كتوثيق الوكالة وعقد الزواج، وبعضها يمكن إنجازه بالوكالة أو إلكترونياً. أرسل تفاصيل معاملتك وسنوضّح لك ما يلزم قبل الحضور.",
  },
  {
    q: "ما المستندات التي أحضرها معي؟",
    a: "بحد أدنى: الهوية الإماراتية سارية المفعول وجواز السفر، إضافةً إلى مستندات خاصة بكل معاملة مثل عقد الزواج أو رقم الدعوى أو رقم المركبة. راسلنا على واتساب لنرسل لك قائمة المستندات المطلوبة لحالتك تحديداً.",
  },
];

const steps = [
  { n: 1, t: "تواصل معنا", d: "اتصل أو راسلنا على واتساب واشرح معاملتك في سطور." },
  { n: 2, t: "نحدّد المتطلبات", d: "نرسل لك قائمة المستندات المطلوبة والمدة والرسوم المتوقّعة." },
  { n: 3, t: "ننجز المعاملة", d: "نجهّز الطلب ونقدّمه ونتابعه لدى الجهة المختصة نيابةً عنك." },
  { n: 4, t: "تستلم النتيجة", d: "نُبلغك فور صدور النتيجة ونسلّمك المستند أو رقم المعاملة." },
];

const trust = [
  { t: "سرعة الإنجاز", d: "معظم الإقرارات والوكالات تُنجز في نفس اليوم عند اكتمال المستندات." },
  { t: "وضوح المتطلبات", d: "نخبرك بالمستندات المطلوبة قبل أن تتحرّك، فلا رحلات مكرّرة." },
  { t: "موقع مركزي في العين", d: "المويجعي، على شارع خليفة بن زايد — قريب من الجهات المعنية." },
  { t: "متابعة شخصية", d: "شخص واحد يتابع ملفك من أول اتصال حتى استلام النتيجة." },
];

export default function HomePage() {
  const services = allServices();
  const featured = services.filter((s) => s.data.order <= 8).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(homeFaqs),
          offerCatalogSchema(
            categories,
            services.map((s) => ({ slug: s.slug, title: s.data.title, category: s.category }))
          ),
        ]}
      />

      {/* ── البطل ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 start-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl"
        />
        <div className="shell relative grid gap-10 py-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.82rem] font-medium text-gold-400">
              <PinIcon className="h-4 w-4" />
              العين — المويجعي، شارع خليفة بن زايد
            </p>
            <h1 className="text-[clamp(1.95rem,4.4vw,2.9rem)] font-bold leading-[1.3] text-white">
              {site.name}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-[1.9] text-white/75">
              عقود الزواج وحجز المأذون الشرعي، الوكالات وكاتب العدل، الإقرارات وحصر الإرث،
              طلبات النيابة والمحاكم، فكّ حجز المركبات وتقسيط الغرامات — نجهّز معاملتك
              ونقدّمها ونتابعها نيابةً عنك حتى استلام النتيجة.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton label={`اتصل الآن ${site.phone}`} />
              <WhatsAppButton label="راسلنا على واتساب" />
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[0.88rem] text-white/70">
              {[site.hours.label, "ردّ سريع على واتساب", "متابعة حتى الاستلام"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-gold-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-[1.05rem] font-bold text-gold-400">ابدأ من هنا</h2>
            <ul className="grid gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/services/${c.slug}/`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-[0.95rem] font-medium text-white no-underline transition-colors hover:bg-white/12"
                  >
                    {c.shortTitle}
                    <ArrowIcon className="h-4 w-4 text-gold-500" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-5 flex items-center gap-2 text-[0.8rem] text-white/50">
              <ClockIcon className="h-4 w-4 text-gold-500" />
              مفتوح يومياً 7:00 ص – 10:30 م
            </p>
          </div>
        </div>
      </section>

      {/* ── الفئات ────────────────────────────────────────────── */}
      <section className="shell py-16 lg:py-20">
        <header className="mb-9 max-w-3xl">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold">خدمات مكتب إنجاز العين</h2>
          <p className="mt-3 leading-[1.85] text-ink-600">
            {services.length} خدمة موزّعة على أربع فئات. اختر الفئة لتصل إلى شرح المعاملة
            والمستندات المطلوبة وخطوات الإنجاز.
          </p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} count={servicesByCategory(c.slug).length} />
          ))}
        </div>
      </section>

      {/* ── كيف نعمل ──────────────────────────────────────────── */}
      <section id="how" className="bg-surface py-16 lg:py-20">
        <div className="shell">
          <h2 className="mb-9 text-[clamp(1.6rem,3vw,2.1rem)] font-bold">كيف نعمل معك؟</h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-[14px] border border-line bg-white p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-gold-500 text-[1.05rem] font-bold text-navy-900">
                  <bdi className="ltr">{s.n}</bdi>
                </span>
                <h3 className="mb-1.5 text-[1.05rem] font-bold">{s.t}</h3>
                <p className="m-0 text-[0.92rem] leading-[1.8] text-ink-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── أكثر الخدمات طلباً ────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="shell py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold">أكثر الخدمات طلباً</h2>
            <GhostButton href="/services/">كل الخدمات <ArrowIcon className="h-4 w-4" /></GhostButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <ServiceCard key={s.slug} doc={s} categorySlug={s.category} />
            ))}
          </div>
        </section>
      )}

      {/* ── لماذا نحن ─────────────────────────────────────────── */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="shell">
          <h2 className="mb-9 text-[clamp(1.6rem,3vw,2.1rem)] font-bold">لماذا مكتب إنجاز العين؟</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <div key={t.t} className="rounded-[14px] border border-line bg-white p-6">
                <CheckIcon className="mb-3 h-6 w-6 text-gold-600" />
                <h3 className="mb-1.5 text-[1.02rem] font-bold">{t.t}</h3>
                <p className="m-0 text-[0.9rem] leading-[1.8] text-ink-600">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── الموقع ────────────────────────────────────────────── */}
      <section id="location" className="shell py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold">موقعنا في العين</h2>
            <dl className="mt-6 grid gap-4 text-[0.98rem]">
              <div className="flex gap-3">
                <PinIcon className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                <div>
                  <dt className="font-semibold text-navy-900">العنوان</dt>
                  <dd className="m-0 text-ink-600">{site.address.full}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                <div>
                  <dt className="font-semibold text-navy-900">ساعات العمل</dt>
                  <dd className="m-0 text-ink-600">{site.hours.label}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <GhostButton href={site.mapsUrl}>افتح في خرائط جوجل</GhostButton>
              <a href={telLink} data-conv="call"
                className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white no-underline hover:bg-navy-700">
                اتصل بنا
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-line shadow-soft">
            <iframe
              title="موقع مكتب إنجاز العين على الخريطة"
              src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=ar&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full border-0 lg:h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* ── الأسئلة الشائعة + دعوة الإجراء ───────────────────── */}
      <section className="shell pb-16 lg:pb-20">
        <FaqAccordion faqs={homeFaqs} />
        <div className="mt-14">
          <CtaCard />
        </div>
      </section>
    </>
  );
}
