/**
 * الإجابة المباشرة (40–50 كلمة) — الهدف: المقتطف المميّز والبحث الصوتي
 * والاقتباس من محركات التوليد. عدد الكلمات مُقيَّد في content.ts.
 */
export function AnswerBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-answer
      className="relative my-7 overflow-hidden rounded-[14px] border border-gold-500/35 bg-gold-50 p-5 ps-6 shadow-soft sm:p-6 sm:ps-7"
    >
      <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1.5 bg-gold-500" />
      <p className="m-0 max-w-none text-[1.05rem] leading-[1.85] font-medium text-navy-900 sm:text-[1.12rem]">
        {children}
      </p>
    </div>
  );
}
