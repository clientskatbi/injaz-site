import { site, telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon, PinIcon } from "./Icons";

/**
 * شريط الإجراءات السفلي على الجوال — أعلى محركات التحويل في هذا النوع من المواقع.
 * يراعي منطقة الأمان في أجهزة iOS عبر env(safe-area-inset-bottom).
 */
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.72rem] font-semibold";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/97 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch divide-x divide-x-reverse divide-line">
        <a href={telLink} data-conv="call" className={`${item} text-navy-900`}>
          <PhoneIcon className="h-5 w-5 text-gold-600" />
          اتصال
        </a>
        <a href={waLink()} data-conv="whatsapp" target="_blank" rel="noopener noreferrer"
          className={`${item} text-navy-900`}>
          <WhatsAppIcon className="h-5 w-5 text-wa-700" />
          واتساب
        </a>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"
          className={`${item} text-navy-900`}>
          <PinIcon className="h-5 w-5 text-navy-700" />
          الموقع
        </a>
      </div>
    </div>
  );
}
