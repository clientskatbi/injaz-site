/**
 * الأسئلة الشائعة — details/summary أصلية: تعمل بلا JS،
 * والنص كامل في HTML فيقرأه محرك البحث وأدوات التوليد.
 */
export function FaqAccordion({ faqs, heading = "الأسئلة الشائعة" }: {
  faqs: { q: string; a: string }[];
  heading?: string;
}) {
  return (
    <section id="faq" className="mt-14 scroll-mt-28">
      <h2 className="mb-5 text-[1.6rem] font-bold text-navy-900">{heading}</h2>
      <div className="grid gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-[14px] border border-line bg-white px-5 open:bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-navy-900 marker:content-none">
              <span>{f.q}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"
                className="h-5 w-5 shrink-0 text-gold-600 transition-transform group-open:rotate-45"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="mt-0 max-w-none border-t border-line pb-5 pt-4 leading-[1.85] text-ink-600">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
