#!/usr/bin/env node
/**
 * يولّد /llms.txt وصورة المشاركة من مصدر البيانات نفسه،
 * فلا تتعارض مع محتوى الموقع عند إضافة خدمات جديدة.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const site = {
  name: "مكتب إنجاز العين",
  url: "https://injaz-one.netlify.app",
  phone: "0543103028",
  address: "شارع خليفة بن زايد – مبنى بن حم – المويجعي – العين، أبوظبي",
  hours: "يومياً 7:00 ص – 10:30 م",
};

const cats = {
  marriage: "عقود الزواج والمأذون الشرعي",
  notary: "كاتب العدل والوكالات والإقرارات",
  prosecution: "النيابات والبلاغات والشكاوى",
  courts: "المحاكم والدعاوى والأحوال الشخصية",
};

const dir = path.join(root, "content", "services");
const docs = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    return { slug: f.replace(/\.mdx$/, ""), ...data };
  })
  .sort((a, b) => a.order - b.order);

/* ── llms.txt ───────────────────────────────────────────── */
let llms = `# ${site.name}

> ${site.name} مكتب خدمات خاص في العين بإمارة أبوظبي، يتولّى تجهيز المعاملات القانونية والعائلية وتقديمها ومتابعتها نيابةً عن العملاء لدى الجهات المختصة. ليس جهة حكومية ولا يقدّم استشارات قانونية.

- الهاتف والواتساب: ${site.phone}
- العنوان: ${site.address}
- ساعات العمل: ${site.hours}
- الجهة القضائية المختصة في العين: دائرة القضاء – أبوظبي (adjd.gov.ae)

## الخدمات (${docs.length} صفحة)
`;

for (const [slug, title] of Object.entries(cats)) {
  llms += `\n### ${title}\n`;
  for (const d of docs.filter((d) => d.category === slug)) {
    llms += `- [${d.title}](${site.url}/services/${slug}/${d.slug}/): ${d.answer}\n`;
  }
}

llms += `\n## صفحات أخرى\n`;
for (const [href, label] of [
  ["/", "الصفحة الرئيسية"],
  ["/services/", "فهرس كل الخدمات"],
  ["/how-it-works/", "كيف نعمل — خطوات إنجاز المعاملة"],
  ["/about/", "من نحن وحدود دورنا"],
  ["/contact/", "الموقع وبيانات التواصل"],
]) {
  llms += `- [${label}](${site.url}${href})\n`;
}

llms += `\n## ملاحظات للاقتباس
- المعلومات إرشادية وقابلة للتغيير وفق أنظمة الجهات المختصة، ولا تُغني عن الاستشارة القانونية.
- مواعيد الطعن المذكورة: 15 يوماً للمعارضة والاستئناف الجزائي، و30 يوماً للاستئناف المدني.
- صندوق الزواج حُلّ عام 2016 ودُمج دوره في وزارة تنمية المجتمع.
- آخر تحديث: ${docs[0]?.updated ?? ""}
`;

fs.writeFileSync(path.join(root, "public", "llms.txt"), llms);

/* ── og-image.svg (يُحوَّل إلى PNG عبر sharp) ─────────────── */
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#12243f"/><stop offset="1" stop-color="#1a365d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="260" fill="#c5a059" opacity="0.08"/>
  <rect x="0" y="0" width="1200" height="10" fill="#c5a059"/>
  <g font-family="IBM Plex Sans Arabic, Segoe UI, Tahoma, sans-serif" text-anchor="end">
    <text x="1100" y="212" font-size="72" font-weight="700" fill="#ffffff">${esc(site.name)}</text>
    <text x="1100" y="300" font-size="38" font-weight="500" fill="#c5a059">تخليص المعاملات القانونية والعائلية</text>
    <text x="1100" y="380" font-size="31" fill="#ffffff" opacity="0.72">عقود الزواج · الوكالات · الإقرارات · حصر الإرث</text>
    <text x="1100" y="432" font-size="31" fill="#ffffff" opacity="0.72">النيابات · المحاكم · الغرامات · فك حجز المركبات</text>
    <text x="1100" y="545" font-size="30" font-weight="600" fill="#ffffff" opacity="0.9">${esc(site.address.split("–").slice(-1)[0].trim())}</text>
  </g>
  <text x="100" y="545" font-family="DM Sans, system-ui, sans-serif" font-size="42" font-weight="700" fill="#c5a059" direction="ltr">${site.phone}</text>
</svg>`;

const sharp = (await import("sharp")).default;
await sharp(Buffer.from(svg)).png().toFile(path.join(root, "public", "og-image.png"));

console.log(`✓ public/llms.txt   (${docs.length} خدمة، ${llms.length} حرفاً)`);
console.log(`✓ public/og-image.png`);
