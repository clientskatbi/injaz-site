"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";
import { ChevronIcon } from "./Icons";

/**
 * فهرس لاصق على الحافة الداخلية في الشاشات الكبيرة، ومطويّ على الجوال.
 * يتتبّع القسم المقروء حالياً عبر IntersectionObserver.
 */
export function TableOfContents({
  items,
  variant,
}: {
  items: TocItem[];
  /** "mobile" يُعرض داخل تدفّق المقال بعد صندوق الإجابة، و"desktop" لاصق على الحافة الداخلية */
  variant: "mobile" | "desktop";
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const list = (
    <ul className="grid gap-1 text-[0.88rem]">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === item.id ? "location" : undefined}
            className={[
              "block rounded-lg py-1.5 pe-2 leading-snug transition-colors",
              item.level === 3 ? "ps-6 text-[0.83rem]" : "ps-3 font-medium",
              active === item.id
                ? "bg-gold-50 text-gold-800"
                : "text-ink-600 hover:bg-navy-50 hover:text-navy-900",
            ].join(" ")}
            style={
              active === item.id
                ? { borderInlineStartWidth: 3, borderInlineStartColor: "var(--color-gold-500)", borderInlineStartStyle: "solid" }
                : undefined
            }
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <div className="mb-8 rounded-[14px] border border-line bg-surface lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-start font-semibold text-navy-900"
        >
          محتويات الصفحة
          <ChevronIcon className={`h-5 w-5 text-ink-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && <div className="border-t border-line px-3 pb-3 pt-2">{list}</div>}
      </div>
    );
  }

  return (
    <nav
      aria-label="محتويات الصفحة"
      className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto lg:block"
    >
      <p className="mb-3 text-xs font-bold text-ink-500">محتويات الصفحة</p>
      {list}
    </nav>
  );
}
