import { site } from "@/lib/site";
import { CallButton, WhatsAppButton } from "./Buttons";
import { ClockIcon } from "./Icons";

export function CtaCard({
  title = "نُنجز معاملتك نيابةً عنك",
  body = "أرسل لنا تفاصيل معاملتك على واتساب، وسنخبرك بالمستندات المطلوبة والمدة المتوقّعة قبل أن تتحرّك من مكانك.",
  message,
  compact = false,
}: { title?: string; body?: string; message?: string; compact?: boolean }) {
  return (
    <div className={`rounded-[14px] bg-navy-900 text-white shadow-lift ${compact ? "p-6" : "p-7 sm:p-9"}`}>
      <h2 className={`mb-2.5 font-bold text-white ${compact ? "text-[1.25rem]" : "text-[1.5rem]"}`}>{title}</h2>
      <p className="m-0 max-w-2xl leading-[1.85] text-white/75">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CallButton />
        <WhatsAppButton label="راسلنا على واتساب" message={message} />
      </div>
      <p className="m-0 mt-5 flex items-center gap-2 text-[0.85rem] text-white/55">
        <ClockIcon className="h-4 w-4 text-gold-500" />
        {site.hours.label}
      </p>
    </div>
  );
}
