#!/usr/bin/env node
/**
 * مدقّق SEO/AEO يعمل قبل البناء.
 * Fails the build rather than shipping a page that breaks a rule.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "services");
const ROSTER = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content", "roster.json"), "utf8")
).services;
const LIMITS = { title: 60, description: 155, answerMin: 40, answerMax: 50 };

const errors = [];
const warnings = [];
const seen = { metaTitle: new Map(), keyword: new Map(), slug: new Set() };

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

if (!fs.existsSync(DIR)) {
  console.log("• لا يوجد محتوى بعد — تم تخطّي الفحص.");
  process.exit(0);
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
if (files.length === 0) {
  console.log("• لا توجد مقالات بعد — تم تخطّي الفحص.");
  process.exit(0);
}

const slugs = new Set(files.map((f) => f.replace(/\.mdx$/, "")));

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data: fm, content } = matter(raw);
  const E = (m) => errors.push(`${file}: ${m}`);
  const W = (m) => warnings.push(`${file}: ${m}`);

  // ── الطول
  if (!fm.metaTitle) E("metaTitle مفقود");
  else if (fm.metaTitle.length > LIMITS.title)
    E(`metaTitle = ${fm.metaTitle.length} حرفاً (الحد ${LIMITS.title})`);

  if (!fm.metaDescription) E("metaDescription مفقود");
  else if (fm.metaDescription.length > LIMITS.description)
    E(`metaDescription = ${fm.metaDescription.length} حرفاً (الحد ${LIMITS.description})`);

  // ── إجابة AEO
  if (!fm.answer) E("answer مفقود");
  else {
    const n = words(fm.answer);
    if (n < LIMITS.answerMin || n > LIMITS.answerMax)
      E(`answer = ${n} كلمة (المطلوب ${LIMITS.answerMin}–${LIMITS.answerMax})`);
  }

  // ── التفرّد
  if (seen.metaTitle.has(fm.metaTitle))
    E(`metaTitle مكرّر مع ${seen.metaTitle.get(fm.metaTitle)}`);
  else seen.metaTitle.set(fm.metaTitle, file);

  if (seen.keyword.has(fm.keyword))
    E(`الكلمة المفتاحية "${fm.keyword}" مكرّرة مع ${seen.keyword.get(fm.keyword)} — تعارض داخلي`);
  else seen.keyword.set(fm.keyword, file);

  // ── الكلمة المفتاحية موجودة فعلاً
  if (fm.keyword) {
    const head = content.slice(0, 900);
    const stem = fm.keyword.split(/\s+/)[0];
    if (!fm.title?.includes(stem) && !head.includes(stem))
      W(`جذر الكلمة المفتاحية "${stem}" غير ظاهر في العنوان ولا في أول فقرة`);
  }

  // ── البنية
  if (/^#\s/m.test(content)) E("H1 داخل المتن — العنوان يأتي من frontmatter فقط");
  const h2 = (content.match(/^##\s/gm) || []).length;
  if (h2 < 3) E(`عدد عناوين H2 = ${h2} (الحد الأدنى 3)`);

  const questionH2 = (content.match(/^##\s.*[؟?]\s*$/gm) || []).length;
  if (questionH2 < 1) W("لا يوجد عنوان H2 بصيغة سؤال — يقلّل فرص المقتطف المميّز");

  // ── الأسئلة والخطوات
  if (!Array.isArray(fm.faqs) || fm.faqs.length < 3 || fm.faqs.length > 5)
    E(`faqs = ${fm.faqs?.length ?? 0} (المطلوب 3–5)`);
  if (!Array.isArray(fm.steps) || fm.steps.length < 3)
    E(`steps = ${fm.steps?.length ?? 0} (الحد الأدنى 3)`);

  if (!Array.isArray(fm.secondaryKeywords) || fm.secondaryKeywords.length < 2)
    E("secondaryKeywords يحتاج عنصرين على الأقل");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.updated ?? "")) E("updated بصيغة غير صحيحة (YYYY-MM-DD)");

  // ── مطابقة السجلّ
  const entry = ROSTER[slug];
  if (!entry) E("غير مُدرَج في content/roster.json");
  else if (entry.category !== fm.category)
    E(`الفئة "${fm.category}" تخالف السجلّ ("${entry.category}")`);

  // ── الروابط الداخلية
  // رابط لصفحة مُدرجة في السجلّ ولم تُكتب بعد = تحذير؛ لغير المُدرجة = خطأ.
  for (const rel of fm.related ?? []) {
    if (slugs.has(rel)) continue;
    if (ROSTER[rel]) W(`related يشير إلى "${rel}" — مُدرج في السجلّ ولم يُكتب بعد`);
    else E(`related يشير إلى "${rel}" وهو غير موجود في السجلّ`);
  }

  const internal = [...content.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
  for (const href of internal) {
    const m = /^\/services\/([^/]+)\/([^/]+)\/$/.exec(href);
    if (!m) continue;
    const [, cat, target] = m;
    if (!ROSTER[target]) E(`رابط داخلي مكسور: ${href}`);
    else if (ROSTER[target].category !== cat)
      E(`رابط بفئة خاطئة: ${href} — الفئة الصحيحة "${ROSTER[target].category}"`);
    else if (!slugs.has(target)) W(`رابط إلى "${target}" — مُدرج ولم يُكتب بعد`);
  }
  if (internal.length === 0) W("لا توجد روابط داخلية في المتن");

  // ── الطول الإجمالي
  // الصفحة تعرض المتن + صندوق الإجابة + الخطوات + الأسئلة، فالعدّ يشملها جميعاً
  const rendered =
    words(content) +
    words(fm.answer ?? "") +
    (fm.steps ?? []).reduce((n, s) => n + words(s.name) + words(s.text), 0) +
    (fm.faqs ?? []).reduce((n, f) => n + words(f.q) + words(f.a), 0);
  if (rendered < 700) W(`الصفحة ${rendered} كلمة معروضة — قد تُعدّ محتوى ضعيفاً`);
  seen.slug.add(slug);
}

const line = "─".repeat(52);
console.log(`\n${line}\nفحص SEO/AEO — ${files.length} صفحة\n${line}`);
for (const w of warnings) console.log(`  ⚠︎  ${w}`);
for (const e of errors) console.log(`  ✕  ${e}`);
if (!errors.length && !warnings.length) console.log("  ✓  كل الصفحات مطابقة.");
console.log(`${line}`);
console.log(`أخطاء: ${errors.length}   تحذيرات: ${warnings.length}\n`);

process.exit(errors.length ? 1 : 0);
