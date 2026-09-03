import Link from "next/link";
import { site, telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** الأرقام تُعزل بـ bdi كي لا تنعكس داخل النص العربي */
export const Phone = ({ intl = false }: { intl?: boolean }) => (
  <bdi className="ltr">{intl ? site.phoneIntl : site.phone}</bdi>
);

const shared =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-transform duration-150 active:scale-[.98]";

export function CallButton({ label = "اتصل الآن", className = "" }) {
  return (
    <a
      href={telLink}
      data-conv="call"
      className={`${shared} bg-gold-500 text-navy-900 shadow-soft hover:bg-gold-400 ${className}`}
    >
      <PhoneIcon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  );
}

export function WhatsAppButton({
  label = "واتساب",
  message,
  className = "",
}: { label?: string; message?: string; className?: string }) {
  return (
    <a
      href={waLink(message)}
      data-conv="whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      className={`${shared} bg-wa-500 text-white shadow-soft hover:bg-wa-700 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  );
}

export function GhostButton({
  href, children, className = "",
}: { href: string; children: React.ReactNode; className?: string }) {
  const cls = `${shared} border-2 border-navy-700/20 bg-white text-navy-800 hover:border-navy-700/45 hover:bg-navy-50 ${className}`;
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}
