import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** الفاصل سهم يشير لليسار في RTL — يوفّره rtl-flip */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقّل" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-medium text-ink-800">{c.name}</span>
              ) : (
                <Link href={c.href} className="hover:text-gold-800 hover:underline">{c.name}</Link>
              )}
              {!last && (
                <svg viewBox="0 0 24 24" aria-hidden="true"
                  className="rtl-flip h-3.5 w-3.5 text-ink-500/60"
                  fill="none" stroke="currentColor" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
