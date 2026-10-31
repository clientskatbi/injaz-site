import type { Metadata } from "next";
import { site, telLink } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnswerBox } from "@/components/AnswerBox";
import { CallButton, WhatsAppButton, GhostButton } from "@/components/Buttons";
import { PhoneIcon, PinIcon, ClockIcon } from "@/components/Icons";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "مكتب إنجاز العين في المويجعي | العنوان والهاتف",
  description:
    "مكتب إنجاز في المويجعي، العين: شارع خليفة بن زايد، مبنى بن حم. يعمل يومياً 7:00 ص–10:30 م. اتصل 0543103028 أو راسلنا عبر واتساب.",
  alternates: { canonical: "/contact/" },
};

const crumbs = [
  { name: "الرئيسية", href: "/" },
  { name: "تواصل معنا", href: "/contact/" },
];

const contactFaqs = [
  {
    q: "أين يقع مكتب إنجاز العين بالضبط؟",
    a: "يقع المكتب في المويجعي، شارع خليفة بن زايد، مبنى بن حم، العين — أبوظبي. زر «خرائط جوجل» في هذه الصفحة يحمّل موقع المكتب مباشرة، والعنوان مدوّن في خرائط جوجل أيضاً.",
  },
  {
    q: "هل يوجد مكتب إنجاز قريب مني في العين؟",
    a: "مكتبنا الوحيد في العين هو هذا المكتب في المويجعي، وهو قريب من الجهات المعنية: دائرة القضاء ومكتب كاتب العدل ومرافق النيابة العامة في العين. إن كنت في منطقة أخرى فراسلنا على واتساب ونؤكد لك أقرب مسار ممكن.",
  },
  {
    q: "كم تستغرق المعاملة عادةً؟",
    a: "معظم الإقرارات والوكالات تُنجز في نفس اليوم متى اكتملت المستندات. أما المعاملات القضائية — فتح ملف الدعوى والاستئناف والتنفيذ — فترتبط مدتها بجدول الجهة المختصة ونوع الطلب، ونحدّد لك المدة المتوقّعة قبل أن تبدأ.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "الدفع بالبطاقة عبر صفحة Ziina الآمنة، أو تحويل بنكي إلى حساب المكتب، أو نقداً في المكتب. وأي معاملة لها مقابلها محدد ومستحق.",
  },
];
export default function ContactPage() {
  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(contactFaqs)]} />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold">تواصل مع مكتب إنجاز العين</h1>

      <AnswerBox>
        يقع مكتب إنجاز العين في {site.address.full}، ويعمل {site.hours.label}. للتواصل اتصل على
        الرقم 0543103028 أو راسلنا على واتساب على الرقم نفسه، واشرح معاملتك لنخبرك بالمستندات
        المطلوبة والمدة المتوقّعة قبل حضورك إلى المكتب.
      </AnswerBox>

      <div className="mt-12 grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <dl className="grid gap-5">
            <div className="flex gap-3">
              <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              <div>
                <dt className="font-semibold text-navy-900">الهاتف والواتساب</dt>
                <dd className="m-0">
                  <a href={telLink} data-conv="call" className="text-ink-600 hover:text-gold-800">
                    <bdi className="ltr">{site.phone}</bdi>
                  </a>
                </dd>
              </div>
            </div>
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

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <WhatsAppButton label="راسلنا على واتساب" />
          </div>
          <div className="mt-3">
            <GhostButton href={site.mapsUrl}>افتح في خرائط جوجل</GhostButton>
          </div>

          <p className="mt-8 rounded-[14px] border border-line bg-surface p-5 text-[0.9rem] leading-[1.85] text-ink-600">
            {site.disclaimer}
          </p>

          <div className="mt-8">
            <FaqAccordion faqs={contactFaqs} heading="أسئلة يبحث عنها أصحاب المكاتب في العين" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-line shadow-soft">
          <iframe
            title="موقع مكتب إنجاز العين على الخريطة"
            src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=ar&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0 lg:h-[520px]"
          />
        </div>
      </div>
    </div>
  );
}
