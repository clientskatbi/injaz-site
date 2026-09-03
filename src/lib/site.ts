/**
 * المصدر الوحيد لبيانات المكتب.
 * Header, footer, contact page and every JSON-LD block read from here.
 * Values verified against the live site injaz-one.netlify.app.
 */

export const site = {
  name: "مكتب إنجاز العين",
  nameEn: "Enjaz Al Ain Office",
  tagline: "تخليص معاملات قانونية وخدمات عائلية في العين",
  /** ≤155 حرفاً — يُستخدم وصفاً افتراضياً لأي صفحة بلا وصف خاص */
  description:
    "مكتب إنجاز العين لتخليص المعاملات: عقود الزواج والمأذون، الوكالات وكاتب العدل، الإقرارات وحصر الإرث، طلبات النيابة والمحاكم، والغرامات. اتصل 0543103028",
  url: "https://injaz-one.netlify.app",
  locale: "ar_AE",
  lang: "ar",

  phone: "0543103028",
  phoneIntl: "+971543103028",
  whatsapp: "971543103028",
  whatsappText: "السلام عليكم، أريد الاستفسار عن خدماتكم",

  address: {
    street: "شارع خليفة بن زايد، مبنى بن حم",
    district: "المويجعي",
    city: "العين",
    region: "أبوظبي",
    country: "AE",
    full: "شارع خليفة بن زايد – مبنى بن حم – المويجعي – العين، أبوظبي",
  },
  geo: { lat: 24.2075, lng: 55.7442 },
  mapsUrl: "https://maps.app.goo.gl/PiUdK8RCrQVkKqEm9",

  hours: { opens: "07:00", closes: "22:30", label: "يومياً 7:00 صباحاً – 10:30 مساءً" },

  googleAdsId: "AW-18145586771",

  /** التموضع القانوني — يظهر في كل صفحة */
  disclaimer:
    "مكتب إنجاز العين مكتب خدمات خاص لتخليص المعاملات نيابةً عن العملاء، ولسنا جهة حكومية ولا تابعين لأي جهة رسمية، ولا نقدّم استشارات قانونية. المعلومات الواردة هنا إرشادية وقد تتغيّر وفق أنظمة الجهات المختصة.",
} as const;

export const waLink = (text: string = site.whatsappText) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = `tel:${site.phoneIntl}`;

/** الجهات المرجعية — تُستخدم في علاقات الكيانات لمحركات التوليد (GEO) */
export const authorities = {
  adjd: {
    name: "دائرة القضاء – أبوظبي",
    url: "https://www.adjd.gov.ae",
    note: "الجهة القضائية المختصة في إمارة أبوظبي، وتتبعها محاكم العين.",
  },
  uae: { name: "البوابة الرسمية لحكومة الإمارات", url: "https://u.ae/ar-ae" },
  adPolice: { name: "شرطة أبوظبي", url: "https://www.adpolice.gov.ae" },
  marriageFund: { name: "صندوق الزواج", url: "https://www.marriagefund.gov.ae" },
} as const;
