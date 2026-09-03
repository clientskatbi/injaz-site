import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { slugifyHeading } from "@/lib/content";
import { AnswerBox } from "./AnswerBox";
import { CtaCard } from "./CtaCard";
import { CheckIcon } from "./Icons";

/** يستخرج نصاً عادياً من عقد React لتوليد مُعرِّف العنوان */
function flatten(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  if (typeof node === "object" && "props" in (node as never)) {
    return flatten((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

/** العناوين تولّد مُعرِّفاتها بنفس دالة الفهرس — فلا ينكسر الربط أبداً */
const Heading = (level: 2 | 3) =>
  function H({ children }: { children?: React.ReactNode }) {
    const id = slugifyHeading(flatten(children));
    const Tag = `h${level}` as "h2" | "h3";
    return (
      <Tag id={id}>
        <a href={`#${id}`} className="no-underline hover:underline">{children}</a>
      </Tag>
    );
  };

/** صندوق ملاحظة داخل النص */
function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="my-7 rounded-[14px] border border-navy-700/15 bg-navy-50 p-5">
      {title && <p className="m-0 mb-1.5 font-bold text-navy-900">{title}</p>}
      <div className="m-0 leading-[1.85] text-ink-600 [&>p]:m-0">{children}</div>
    </aside>
  );
}

/** قائمة تحقّق للمستندات */
function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="my-6 grid gap-2.5 !ps-0">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 !ps-0 before:!content-none">
          <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-wa-700" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

const components = {
  h2: Heading(2),
  h3: Heading(3),
  table: (p: React.ComponentProps<"table">) => (
    <div className="table-scroll"><table {...p} /></div>
  ),
  a: ({ href = "", ...p }: React.ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...p} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" {...p} />
    ),
  AnswerBox,
  CtaCard,
  Note,
  Checklist,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
