/** خطوات الإنجاز — تُغذّي مخطط HowTo وتستهدف مقتطف "الخطوات" */
export function StepsList({ steps, title = "خطوات الإنجاز" }: {
  steps: { name: string; text: string }[];
  title?: string;
}) {
  return (
    <section id="steps" className="my-10 scroll-mt-28">
      <h2 className="mb-5 text-[1.6rem] font-bold text-navy-900">{title}</h2>
      <ol className="grid gap-4">
        {steps.map((s, i) => (
          <li key={s.name} className="flex gap-4 rounded-[14px] border border-line bg-white p-4 shadow-soft sm:p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 text-[0.95rem] font-bold text-gold-500">
              <bdi className="ltr">{i + 1}</bdi>
            </span>
            <div className="min-w-0">
              <h3 className="mb-1 text-[1.05rem] font-bold text-navy-900">{s.name}</h3>
              <p className="m-0 leading-[1.8] text-ink-600">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
