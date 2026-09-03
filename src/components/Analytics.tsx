"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";

/**
 * وسم Google Ads المنقول من الموقع الحالي، مع تتبّع نقرات
 * الاتصال والواتساب كأحداث تحويل — لم يكن ذلك متوفراً سابقاً.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-conv]");
      if (!el) return;
      const kind = el.dataset.conv;
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      gtag?.("event", "conversion_click", {
        send_to: site.googleAdsId,
        conversion_channel: kind,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${site.googleAdsId}');`}
      </Script>
    </>
  );
}
