"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, telLink, waLink } from "@/lib/site";
import { categories } from "@/lib/categories";
import { PhoneIcon, WhatsAppIcon, ClockIcon, PinIcon, ChevronIcon } from "./Icons";

const nav = [
  { href: "/services/", label: "خدماتنا", panel: true },
  { href: "/how-it-works/", label: "كيف نعمل" },
  { href: "/articles/", label: "مقالات" },
  { href: "/contact/", label: "موقعنا وتواصل" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* شريط المعلومات العلوي — يختفي على الشاشات الصغيرة */}
      <div className="hidden bg-navy-900 text-white/85 md:block">
        <div className="shell flex items-center justify-between py-2 text-[0.82rem]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 text-gold-400" />
              {site.hours.label}
            </span>
            <span className="flex items-center gap-1.5">
              <PinIcon className="h-4 w-4 text-gold-400" />
              {site.address.district} – {site.address.city}
            </span>
          </div>
          <a href={telLink} data-conv="call" className="flex items-center gap-1.5 font-semibold text-gold-400 hover:text-gold-500">
            <PhoneIcon className="h-4 w-4" />
            <bdi className="ltr">{site.phone}</bdi>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="shell flex items-center justify-between gap-4 py-3">
          {/* الشعار في بداية السطر (يمين في RTL) */}
          <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={() => setOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-lg font-bold text-gold-500">
              إ
            </span>
            <span className="leading-tight">
              <span className="block text-[1.05rem] font-bold text-navy-900">مكتب إنجاز العين</span>
              <span className="block text-[0.72rem] font-medium text-ink-500">تخليص المعاملات</span>
            </span>
          </Link>

          <nav aria-label="التنقّل الرئيسي" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.panel ? (
                <div key={item.href} className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}>
                  <Link href={item.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-ink-800 hover:bg-navy-50 hover:text-navy-900">
                    {item.label}
                    <ChevronIcon className="h-4 w-4 text-ink-500" />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute top-full start-0 w-72 rounded-2xl border border-line bg-white p-2 shadow-lift">
                      {categories.map((c) => (
                        <Link key={c.slug} href={`/services/${c.slug}/`}
                          className="block rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-ink-800 hover:bg-navy-50 hover:text-navy-900">
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href}
                  className="rounded-lg px-3 py-2 font-medium text-ink-800 hover:bg-navy-50 hover:text-navy-900">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a href={waLink()} data-conv="whatsapp" target="_blank" rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-wa-500 px-4 py-2.5 font-semibold text-white hover:bg-wa-700 sm:inline-flex">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              واتساب
            </a>

            <button type="button" onClick={() => setOpen((v) => !v)}
              aria-expanded={open} aria-controls="mobile-nav"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-navy-900 lg:hidden">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
            <nav aria-label="التنقّل على الجوال" className="shell grid gap-1 py-4">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-semibold text-navy-900 hover:bg-navy-50">
                  {item.label}
                </Link>
              ))}
              <span className="mt-2 px-3 text-xs font-semibold tracking-normal text-ink-500">الفئات</span>
              {categories.map((c) => (
                <Link key={c.slug} href={`/services/${c.slug}/`} onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[0.95rem] text-ink-800 hover:bg-navy-50">
                  {c.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
