#!/usr/bin/env node
/**
 * فحص المخرجات النهائية بعد البناء.
 * The frontmatter linter cannot see what the layout adds (a brand suffix,
 * a wrapper, a missing tag), so this pass reads the exported HTML itself
 * and counts CHARACTERS — not bytes — which matters for Arabic.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const LIMITS = { title: 60, description: 155 };

if (!fs.existsSync(OUT)) {
  console.error("✕ مجلد out غير موجود — شغّل next build أولاً.");
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pages.push(p);
  }
})(OUT);

const errors = [];
const warnings = [];
const titles = new Map();

const pick = (html, re) => { const m = re.exec(html); return m ? m[1] : null; };
const count = (html, needle) => html.split(needle).length - 1;

for (const file of pages) {
  const dir = path.relative(OUT, path.dirname(file)).replace(/\\/g, "/");
  const rel = dir === "" ? "/" : `/${dir}/`;
  const html = fs.readFileSync(file, "utf8");
  const E = (m) => errors.push(`${rel} — ${m}`);
  const W = (m) => warnings.push(`${rel} — ${m}`);

  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([\s\S]*?)"/);

  if (!title) E("لا يوجد <title>");
  else {
    if ([...title].length > LIMITS.title)
      E(`طول العنوان ${[...title].length} حرفاً (الحد ${LIMITS.title}): «${title}»`);
    if (titles.has(title)) E(`عنوان مكرّر مع ${titles.get(title)}`);
    else titles.set(title, rel);
  }

  if (!desc) E("لا يوجد وصف");
  else if ([...desc].length > LIMITS.description)
    E(`طول الوصف ${[...desc].length} حرفاً (الحد ${LIMITS.description})`);

  const h1 = count(html, "<h1");
  if (h1 !== 1) E(`عدد عناوين H1 = ${h1} (المطلوب 1)`);

  if (!/rel="canonical"/.test(html)) E("لا يوجد رابط canonical");
  if (!/<html lang="ar" dir="rtl"/.test(html)) E("سمة lang أو dir غير صحيحة");

  // مخططات البيانات المهيكلة موجودة في HTML نفسه لا مضافة بجافاسكربت
  // الرئيسية وصفحة 404 لا تحملان مسار تنقّل
  const needsBreadcrumb = rel !== "/" && rel !== "/404/";
  if (!html.includes('"@type":"ProfessionalService"')) W("مخطط ناقص: ProfessionalService");
  if (needsBreadcrumb && !html.includes('"@type":"BreadcrumbList"'))
    W("مخطط ناقص: BreadcrumbList");

  // صفحات الخدمات: تحقّق كامل
  if (/^\/services\/[^/]+\/[^/]+\/$/.test(rel)) {
    for (const t of ['"@type":"Article"', '"@type":"HowTo"', '"@type":"FAQPage"', '"@type":"Service"']) {
      if (!html.includes(t)) E(`مخطط ناقص: ${t}`);
    }
    if (!html.includes("data-answer")) E("صندوق الإجابة غير موجود في HTML");
    if (!/<h2/.test(html)) E("لا توجد عناوين H2");
  }

  // JSON-LD صالح
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1].replace(/\\u003c/g, "<")); }
    catch { E("JSON-LD غير صالح"); }
  }
}

const line = "─".repeat(56);
console.log(`\n${line}\nفحص المخرجات — ${pages.length} صفحة\n${line}`);
for (const w of warnings) console.log(`  ⚠︎  ${w}`);
for (const e of errors) console.log(`  ✕  ${e}`);
if (!errors.length && !warnings.length) console.log("  ✓  كل الصفحات المُصدَّرة مطابقة.");
console.log(`${line}\nأخطاء: ${errors.length}   تحذيرات: ${warnings.length}\n`);
process.exit(errors.length ? 1 : 0);
