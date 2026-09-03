import type { Metadata } from "next";
import Link from "next/link";
import { site, authorities } from "@/lib/site";
import { categories } from "@/lib/categories";
import { allServices } from "@/lib/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnswerBox } from "@/components/AnswerBox";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaCard } from "@/components/CtaCard";
import { Disclaimer } from "@/components/Disclaimer";
import { CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "من نحن — مكتب خدمات خاص في العين",
  description:
    "مكتب إنجاز العين: مكتب خدمات خاص لتخليص المعاملات في العين. تعرّف على ما نفعله وما لا نفعله، والجهات التي نتعامل معها، وحدود دورنا مقارنةً بالمحامي.",
  alternates: { canonical: "/about/" },
};

const crumbs = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about/" },
];

const faqs = [
  {
    q: "هل مكتب إنجاز العين جهة حكومية؟",
    a: "لا. نحن مكتب خدمات خاص نتولّى تجهيز المعاملات وتقديمها ومتابعتها نيابةً عن العملاء لدى الجهات المختصة، ولسنا تابعين لأي جهة رسمية ولا نملك صلاحية البتّ في أي طلب.",
  },
  {
    q: "هل تقدّمون استشارات قانونية؟",
    a: "لا نقدّم استشارات قانونية ولا نترافع أمام المحاكم. دورنا إجرائي: تجهيز المستندات وصياغة الطلبات وتقديمها ومتابعتها. وإن احتاجت حالتك رأياً قانونياً أو ترافعاً، فالمسار الصحيح هو الاستعانة بمحامٍ مرخّص.",
  },
  {
    q: "ما الجهات التي تُقدَّم لديها المعاملات؟",
    a: "معظم معاملات العين تختصّ بها دائرة القضاء في أبوظبي وما يتبعها من محاكم وكاتب عدل ودائرة تنفيذ، إضافةً إلى جهات اتحادية أو محلية أخرى بحسب نوع المعاملة كوزارة تنمية المجتمع في منح الزواج.",
  },
  {
    q: "هل تضمنون نتيجة المعاملة؟",
    a: "لا يضمن أحد نتيجة قرار تصدره جهة مختصة، ومن يَعِدك بذلك يضلّلك. ما نضمنه هو تجهيز ملف مكتمل وصحيح وتقديمه في مساره الصحيح ومتابعته، وهذه هي العوامل التي نتحكّم فيها فعلاً.",
  },
];

export default function AboutPage() {
  const count = allServices().length;

  return (
    <div className="shell py-10 lg:py-14">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold">من نحن</h1>

      <AnswerBox>
        مكتب إنجاز العين مكتب خدمات خاص في المويجعي بالعين، متخصّص في تخليص المعاملات
        القانونية والعائلية نيابةً عن العملاء. نتولّى تجهيز الطلب وصياغته وتقديمه ومتابعته
        لدى الجهة المختصة حتى صدور النتيجة، ولسنا جهة حكومية ولا نقدّم استشارات قانونية.
      </AnswerBox>

      <div className="prose-ar mt-10 max-w-none">
        <h2 className="text-[1.6rem]">ما الذي نفعله بالضبط؟</h2>
        <p className="measure">
          معظم المعاملات لا تتعثّر لأنها معقّدة، بل لأن ملفاً نقصه مستند، أو قُدِّم لجهة غير
          مختصة، أو صيغ طلبه بعبارات لا تصلح لأن تُبنى عليها نتيجة. دورنا أن نغلق هذه الفجوة:
          نراجع حالتك، ونحدّد المستندات المطلوبة قبل أن تتحرّك، ونصوغ الطلب ونقدّمه في مساره
          الصحيح، ثم نتابعه حتى النتيجة.
        </p>

        <h2 className="text-[1.6rem]">ما الفرق بيننا وبين المحامي؟</h2>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">الدور</th>
              <th scope="col">مكتب إنجاز العين</th>
              <th scope="col">المحامي</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">تجهيز المستندات وتقديم الطلبات</th><td>نعم</td><td>نعم</td></tr>
            <tr><th scope="row">متابعة المعاملة لدى الجهة</th><td>نعم</td><td>نعم</td></tr>
            <tr><th scope="row">الرأي والاستشارة القانونية</th><td>لا</td><td>نعم</td></tr>
            <tr><th scope="row">الترافع أمام المحكمة</th><td>لا</td><td>نعم</td></tr>
          </tbody>
        </table>
      </div>

      <div className="prose-ar max-w-none">
        <p className="measure">
          كثير من المعاملات — الإقرارات، والوكالات، وفتح الملفات، والطلبات الإجرائية — لا تحتاج
          محامياً أصلاً. وحين تحتاج حالتك ترافعاً أو رأياً قانونياً، نقول لك ذلك صراحةً.
        </p>

        <h2 className="text-[1.6rem]">الجهات التي نتعامل معها</h2>
        <p className="measure">
          العين تتبع إمارة أبوظبي، والجهة القضائية المختصة فيها هي{" "}
          <a href={authorities.adjd.url} target="_blank" rel="noopener noreferrer nofollow">
            {authorities.adjd.name}
          </a>{" "}
          وما يتبعها من محاكم وكاتب عدل ودائرة تنفيذ ونيابة. وبعض المعاملات تختصّ بها جهات
          اتحادية أو محلية أخرى، كمنح الزواج التي تتولّاها وزارة تنمية المجتمع بعد دمج صندوق
          الزواج فيها.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="mb-5 text-[1.5rem] font-bold">نطاق خدماتنا</h2>
        <p className="mb-6 max-w-3xl leading-[1.85] text-ink-600">
          {count} خدمة موزّعة على أربع فئات:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/services/${c.slug}/`}
                className="flex items-start gap-3 rounded-[14px] border border-line bg-white p-5 no-underline hover:border-gold-500/45 hover:bg-surface"
              >
                <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                <span>
                  <span className="block font-bold text-navy-900">{c.title}</span>
                  <span className="mt-1 block text-[0.88rem] text-ink-500">
                    {c.keyword}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqAccordion faqs={faqs} heading="أسئلة عن المكتب" />
      <Disclaimer />

      <div className="mt-14">
        <CtaCard message={`السلام عليكم، أريد الاستفسار عن خدمات ${site.name}`} />
      </div>
    </div>
  );
}
