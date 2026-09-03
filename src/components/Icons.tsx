/** أيقونات خطيّة خفيفة — بلا مكتبات خارجية */
type P = { className?: string };
const base = "h-5 w-5 shrink-0";

export const PhoneIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.8 9.8 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 18a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.32c0-4.52 3.67-8.19 8.19-8.19 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.52-3.68 8.19-8.2 8.19Zm4.49-6.13c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.97-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.97-1.22-.73-.65-1.22-1.45-1.36-1.7-.14-.24-.02-.37.1-.5.11-.1.25-.28.37-.42.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.05s.87 2.37.99 2.54c.12.16 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.46-.29Z" />
  </svg>
);

export const PinIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

export const CheckIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m20 6-11 11-5-5" />
  </svg>
);

/** سهم اتجاهي — يُقلب في RTL عبر rtl-flip */
export const ArrowIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" className={`rtl-flip ${className}`} aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const ChevronIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const cat = "h-7 w-7";
export const RingsIcon = ({ className = cat }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <circle cx="9" cy="15" r="5.2" /><circle cx="15" cy="15" r="5.2" />
    <path d="M12 3.2 13.9 6h-3.8L12 3.2Z" strokeLinejoin="round" />
  </svg>
);
export const SealIcon = ({ className = cat }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.8-1 7.2L12 19l4.5 2-1-7.2" />
  </svg>
);
export const GavelIcon = ({ className = cat }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m14.5 3.5 6 6M17.5 6.5 11 13l-3-3 6.5-6.5M9.5 11.5 4 17l3 3 5.5-5.5M3 21h8" />
  </svg>
);
export const ScalesIcon = ({ className = cat }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 3v18M7 21h10M4 7h16M6.5 7 4 13h5L6.5 7ZM17.5 7 15 13h5l-2.5-6Z" />
  </svg>
);

export const categoryIcons = {
  rings: RingsIcon, seal: SealIcon, gavel: GavelIcon, scales: ScalesIcon,
} as const;
