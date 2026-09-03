import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { CategorySlug } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content", "services");

/**
 * مخطط البيانات الوصفية — يُتحقَّق منه أثناء البناء.
 * Any article that breaks an SEO/AEO rule fails the build rather than
 * shipping quietly. See scripts/seo-check.mjs for the CI-facing report.
 */
export const frontmatterSchema = z.object({
  title: z.string().min(8),
  metaTitle: z.string().min(10).max(60),
  metaDescription: z.string().min(60).max(155),
  category: z.enum(["marriage", "notary", "prosecution", "courts"]),
  pdfItems: z.array(z.number().int().positive()).min(1),
  keyword: z.string().min(3),
  secondaryKeywords: z.array(z.string()).min(2),
  /** الإجابة المباشرة: 40–50 كلمة، هدف المقتطف المميّز والبحث الصوتي */
  answer: z.string(),
  aliases: z.array(z.string()).default([]),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number().int().default(99),
  steps: z
    .array(z.object({ name: z.string().min(3), text: z.string().min(15) }))
    .min(3),
  faqs: z.array(z.object({ q: z.string().min(6), a: z.string().min(25) })).min(3).max(5),
  related: z.array(z.string()).default([]),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ServiceDoc {
  slug: string;
  category: CategorySlug;
  data: Frontmatter;
  body: string;
  toc: TocItem[];
  readingMinutes: number;
}

/** يجب أن يطابق مُعرِّفات rehype-slug الناتجة عن العناوين العربية */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .replace(/[?؟!.,،:؛"'()[\]{}]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function buildToc(body: string): TocItem[] {
  const toc: TocItem[] = [];
  // skip fenced code blocks so "## " inside them is not mistaken for a heading
  const lines = body.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").trim();
    toc.push({ id: slugifyHeading(text), text, level: m[1].length as 2 | 3 });
  }
  return toc;
}

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export function readServiceFile(slug: string): ServiceDoc {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in content/services/${slug}.mdx:\n${issues}`);
  }

  const answerWords = countWords(parsed.data.answer);
  if (answerWords < 40 || answerWords > 50) {
    throw new Error(
      `AEO answer in ${slug}.mdx is ${answerWords} words; must be 40–50 to win the snippet.`
    );
  }

  return {
    slug,
    category: parsed.data.category,
    data: parsed.data,
    body: content,
    toc: buildToc(content),
    readingMinutes: Math.max(1, Math.round(countWords(content) / 180)),
  };
}

let cache: ServiceDoc[] | null = null;

export function allServices(): ServiceDoc[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) return (cache = []);
  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readServiceFile(f.replace(/\.mdx$/, "")))
    .sort((a, b) => a.data.order - b.data.order || a.slug.localeCompare(b.slug));
  return cache;
}

export const servicesByCategory = (category: CategorySlug): ServiceDoc[] =>
  allServices().filter((s) => s.category === category);

export const serviceBySlug = (slug: string): ServiceDoc | undefined =>
  allServices().find((s) => s.slug === slug);

/** الخدمات ذات الصلة: المحدَّدة يدوياً أولاً، ثم من الفئة نفسها */
export function relatedServices(doc: ServiceDoc, limit = 3): ServiceDoc[] {
  const picked = doc.data.related
    .map((s) => serviceBySlug(s))
    .filter((s): s is ServiceDoc => Boolean(s) && s!.slug !== doc.slug);
  const filler = servicesByCategory(doc.category).filter(
    (s) => s.slug !== doc.slug && !picked.some((p) => p.slug === s.slug)
  );
  return [...picked, ...filler].slice(0, limit);
}
