# PROJECT_MAP — Enjaz Al Ain SEO Website

> Continuity handoff for the live Enjaz Al Ain SEO site. Last verified: 2026-10-25.

## Project
- Client: مكتب إنجاز العين.
- Site: https://www.enjaz-alain.com/; canonical host is `www` (apex redirects).
- Repository: `~/Projects/clients/injaz-site`, Git `main`, remote `origin/main`.
- Stack/build: Next.js 15 static export; `npm run build` runs assets, SEO checks, RTL lint, Next build, and exported-HTML verification.
- Local business: Google Business listing `انجاز معاملات المحاكم ودائرة القضاء والنيابه`, place ID `ChIJWbyZ6Zixij4RPRMyKSkWIvM`; 4.9/5 from 56 reviews as observed 2026-10-25.

## Constraints
- Keep the Google Business destination URL unchanged. It currently shows `injaz-one.netlify.app`; this is intentionally separate from the SEO site/ads destination per Bilal.
- Do not post owner replies to public reviews without explicit approval. Do not fabricate review activity or claim that review responses were posted.
- Do not change Google Ads settings, the GBP URL, client-facing portal, address, or phone as part of on-page CTR work.
- SEO copy must stay accurate to the site's documented service, Arabic-first, and must not promise legal outcomes.
- Billing check on 2026-10-25 via the client invoice API shows only the September 2026 SEO subscription invoice (`INV-ENJA-E2D5`) as paid; no October invoice/payment appears in the recorded portal. Bilal confirmed on 2026-10-25 that October is unpaid; no additional SEO work or production deployment until settlement. Bilal approved the exact metadata above for publication after payment.

## Verified GSC baseline (dataState=final, as of 2026-10-25)
- Latest final day: 2026-10-23.
- 2026-10-17–23: 5 clicks, 704 impressions, CTR 0.71%, weighted average position 8.33.
- Prior 2026-10-10–16: 9 clicks, 548 impressions, CTR 1.64%, weighted average position 8.24.
- Residence declaration page 2026-10-17–23: 61 impressions, 0 clicks, position 7.97. Query `اقرار سكن` on that page: 18 impressions, 0 clicks, position 7.61.
- Contact page 2026-10-17–23: 273 impressions, 4 clicks, CTR 1.47%, position 5.24. Its visible queries are mostly branded/local; page/query dimension rows are not additive to overall totals.
- Expanded exact-period breakdown (GSC final): homepage 1/170 clicks/impressions, CTR 0.59%, position 7.3 (prior 2/164, 1.22%, 5.5); contact 4/273, 1.47%, 5.2 (prior 2/230, 0.87%, 5.8); residence 0/61, 0%, 8.0 (prior 1/50, 2.00%, 8.1); bail-request 0/59, 0%, 6.9 (prior 0/28, 0%, 8.3).
- Query findings 2026-10-17–23: sitewide `انجاز العين` 0 clicks/64 impressions, average position 3.2; `انجاز العين مول` 0/20, position 10.5; `اقرار سكن` 0/18, position 7.6. On the contact page, `انجاز العين` had 0/60 at position 4.8 and `مكتب انجاز العين` 0/44 at 3.3. On the residence page, `اقرار سكن` had 0/18 at 7.6; small remaining query rows are low volume.
- Device/country: mobile 5 clicks/603 impressions; desktop 0/100; tablet 0/1. UAE 5 clicks/522 impressions (CTR 0.96%, position 7.1). The five site clicks came from mobile and UAE in this period.
- Daily pattern: impressions peaked 2026-10-19 at 160 with 0 clicks; 2026-10-23 had 92 impressions, 1 click, and average position 12.3. These are descriptive signals, not evidence of cause.

## Current live metadata before this task
- Residence declaration: title `اقرار سكن في العين: التوثيق والمستندات | مكتب إنجاز`; description in `content/services/residence-declaration.mdx`.
- Contact: metadata in `src/app/contact/page.tsx`; H1 is `تواصل مع مكتب إنجاز العين`.
- Both pages return 200 with self-canonical URLs and current metadata matching source.

## Prepared metadata (not live; 2026-10-25)
- Residence title: `إقرار سكن في العين: الشروط والمستندات | مكتب إنجاز` (50 chars). Description: `تعرّف إلى من يحق له إصدار إقرار السكن في العين، والمستندات اللازمة وخطوات توثيقه لدى كاتب العدل. اقرأ الشروط قبل تقديم المعاملة.` (128 chars).
- Contact title: `مكتب إنجاز العين في المويجعي | العنوان والهاتف` (46 chars). Description: `مكتب إنجاز في المويجعي، العين: شارع خليفة بن زايد، مبنى بن حم. يعمل يومياً 7:00 ص–10:30 م. اتصل 0543103028 أو راسلنا عبر واتساب.` (128 chars).
- `npm run build` passed: 35 exported pages, 0 errors; SEO check has 1 existing warning in `bail-request.mdx` about the keyword root «شروط» missing from title/first paragraph; RTL check passed 33 files; exported-HTML check 35 pages, 0 errors/warnings. `git diff --check` passed. No commit, push, or deploy.

## Google Business review monitoring
- As of 2026-10-25: 56 reviews, 4.9/5. Latest three reviews dated 2026-10-20, 2026-10-08, and 2026-10-04 are 5-star and have no owner replies in the collected Google data; several older reviews in the latest 10 are also unanswered.
- A public Maps view verified the listing identity, address, rating, phone, and current destination URL. No GBP edits or replies were made.
- Draft replies prepared for approval (not posted): Oct 20 — «شكراً لكم على ثقتكم وكلماتكم الطيبة. يسعدنا أن نكون عند حسن ظنكم، ونقدّر إشادتكم بسرعة الإنجاز وحسن التعامل. نتمنى لكم التوفيق، ونسعد بخدمتكم دائماً.»; Oct 8 — «شكراً لتقييمكم وثقتكم بمكتب إنجاز العين. يسعدنا رضاكم، ونتطلع لخدمتكم دائماً.»; Oct 4 — «نقدّر تقييمكم الكريم لمكتب إنجاز العين، وشكراً لاختياركم لنا. نتمنى لكم كل التوفيق.»
- Reply drafts require Bilal's approval before posting.

## In progress
- Kanban task `t_8bc6c5a7` (assigned to Nibras): local metadata-only patch reviewed and verified; only the two specified source files changed. No commit, push, deployment, portal write, or GBP edit. The new metadata is not live; October subscription is unpaid. Bilal approved publishing the exact copy after payment.
- Weekly report cron `119304331333` is scheduled for Monday 2026-10-26 09:00 Asia/Dubai at Bilal's request. It posts the final-data comparison to the client portal and verifies the readback. The report must distinguish measured results from changes not yet deployed; do not claim an immediate CTR uplift.

## [ORPHANS & PENDING]
- October SEO subscription is unpaid; after payment, publish the exact metadata already approved by Bilal and verify the live HTML.
- On 2026-10-26, publish the scheduled weekly GSC update to the client portal and verify the content revision.
- Get Bilal's approval for the three drafted Google Business replies before posting; keep the listing URL unchanged.

## [CHANGELOG]
- 2026-10-25 — Added this website handoff and linked it from `~/Projects/PROJECT_INDEX.md`; recorded final GSC baseline, page/query/device/country/day breakdown, and Google Business review snapshot. Nibras changed metadata in two source files only; Jarvis reviewed and independently ran `npm run build` (35 exported pages; 0 errors; 1 existing SEO warning in `bail-request.mdx`; RTL and HTML checks passed). Verified generated titles, descriptions, canonical URLs, and character counts. Bilal confirmed October subscription is unpaid and approved the exact copy for post-payment deployment. Expanded cron `119304331333` to an evidence-based, positive-focused client update with detailed page/query/device/country/day analysis, measurable next steps, and a two-page Arabic RTL PDF for Bilal; it remains scheduled for 2026-10-26 09:00 Asia/Dubai and is set to post the summary in the client portal and send Bilal the PDF in Telegram topic `123248`.