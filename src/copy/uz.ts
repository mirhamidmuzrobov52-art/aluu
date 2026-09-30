/**
 * @file uz.ts
 * @description Single source of truth for all Uzbek strings used throughout Aluvantis.
 */

export interface CaseItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  badge: string;
  image: string;
  summary: string;
  liveUrl: string;
  domain: string;
  status: 'active' | 'coming_soon';
}

export interface PricingPlan {
  id: string;
  name: string;
  target: string;
  price: string;
  period: string;
  isPopular?: boolean;
  features: string[];
  cta: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const uzCopy = {
  meta: {
    brandName: 'ALUVANTIS',
    tagline: 'Biznesingiz onlayn — 48 soatda',
    location: 'Toshkent',
  },
  nav: {
    works: 'Ishlar',
    pricing: 'Narxlar',
    faq: 'FAQ',
    orderCta: 'Buyurtma',
  },
  hero: {
    headline: 'Biznesingiz onlayn — 48 soatda.',
    sub: "Kafe, do'kon, salonlar uchun sayt. Hosting umrbod bepul. Bozor narxidan past. Biz hammasini qilamiz — siz biznesingizni yuritasiz.",
    primaryCta: 'Buyurtma berish',
    secondaryCta: "Ishlarimizni ko'rish",
    badge: 'Toshkent raqamli studiyasi',
  },
  stats: [
    {
      value: 48,
      suffix: ' soat',
      label: 'Ishga tushirish',
      description: 'Shartnomadan so\'ng tayyor sayt',
    },
    {
      value: 0,
      prefix: '',
      suffix: " so'm",
      label: 'Umrbod hosting',
      description: 'Hech qanday oylik server to\'lovi yo\'q',
    },
    {
      value: 50,
      prefix: '< ',
      suffix: '%',
      label: 'Bozor narxidan',
      description: 'Ortiqcha xarajatlarsiz adolatli narx',
    },
  ],
  howItWorks: {
    title: 'Qanday ishlaydi',
    subtitle: 'Murakkab jarayonlar yo\'q. Faqat 3 ta aniq qadam.',
    steps: [
      {
        step: '01',
        title: 'Suhbat',
        description: '15 daqiqalik Telegram qo\'ng\'iroq orqali menyu, xizmatlar va talablarni aniqlab olamiz.',
      },
      {
        step: '02',
        title: 'Quramiz',
        description: '48 soat ichida sayt dizayni, matnlari va mobil moslashuvini to\'liq tayyorlaymiz.',
      },
      {
        step: '03',
        title: 'Ishga tushiramiz',
        description: 'Domen, bepul hosting va Telegram xabarnomalarini ulab, kalit topshiramiz.',
      },
    ],
  },
  worksPreview: {
    title: 'Oxirgi ishlarimiz',
    subtitle: 'Toshkent tadbirkorlari biz bilan qanday natijalarga erishmoqda',
    viewAll: 'Barcha ishlarni ko\'rish',
  },
  cases: [
    {
      id: 'durda-uz',
      title: 'DURDA — Yurak Shaklidagi Tabiiy Durda',
      category: 'Milliy Mahsulot',
      metric: 'Faol Platforma',
      badge: 'durda.uz',
      domain: 'durda.uz',
      image: '/src/assets/images/durda_uz_real_ui_1790573990965.jpg',
      summary: 'Yurak shaklidagi toza tabiiy durda. 3 xil sof tarkib (qatiq, qaymoq, tuz), cho\'yan qozonda sekin olovda 4-5 soat qaynatilgan an\'anaviy Samarqand sariyog\' durdasi.',
      liveUrl: 'https://durda.uz',
      status: 'active',
    },
    {
      id: 'sakinward',
      title: 'Sakinward — Islomiy Xotirjamlik & Ma\'naviy Yo\'ldosh',
      category: 'Ruhiy Orom & AI',
      metric: 'Faol Platforma',
      badge: 'sakinwardapp.aluvantis.uz',
      domain: 'sakinwardapp.aluvantis.uz',
      image: '/src/assets/images/sakinward_islamic_ui_1790574576763.jpg',
      summary: 'Sakinward (sakinwardapp.aluvantis.uz) — "Sokinlik va ma\'naviyat" shiori ostidagi ruhiy xotirjamlik ilovasi. Sakin AI aqlli suhbatdoshi, Qur\'on tilovati tabiat sadolari bilan, astronomik namoz vaqtlari, Qibla va tasbeh.',
      liveUrl: 'https://sakinwardapp.aluvantis.uz/landingpage',
      status: 'active',
    },
    {
      id: 'aluvantis-erp',
      title: 'Aluvantis ERP',
      category: 'Biznes & Ombor Tizimi',
      metric: 'To\'liq Avtomatizatsiya',
      badge: 'erp.aluvantis.uz',
      domain: 'erp.aluvantis.uz',
      image: '/src/assets/images/aluvantis_erp_ui_1790572508338.jpg',
      summary: 'Omborxona qoldiqlari, tovarlar harakati (Keldi, Chiqdi, Qoldiq), kassa tushumi va intellektual monitoringni bitta joyda boshqaruvchi ERP intellektual tizimi.',
      liveUrl: 'https://erp.aluvantis.uz',
      status: 'active',
    },
    {
      id: 'aluvantis-ai-studio',
      title: 'Aluvantis AI Studio',
      category: 'Kutilmoqda',
      metric: 'Program Builder',
      badge: 'Yangi Startap',
      domain: 'aistudio.aluvantis.uz',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      summary: 'Aluvantis AI Studio Program Builder — kod yozmasdan AI orqali veb-dastur va dasturiy ta\'minotlarni 10x tezroq yaratuvchi platforma.',
      liveUrl: 'https://aistudio.aluvantis.uz',
      status: 'coming_soon',
    },
    {
      id: 'barber-studio',
      title: 'Barber Studio',
      category: 'Kutilmoqda',
      metric: 'Barberlar Agregatori',
      badge: 'Yangi Startap',
      domain: 'barber.aluvantis.uz',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      summary: 'Barcha sartaroshxona va barberlarni yagona bazada jamlagan platforma: ustalar portfoliosi, mijoz sharhlari va oldindan navbat olish.',
      liveUrl: 'https://barber.aluvantis.uz',
      status: 'coming_soon',
    },
    {
      id: 'restoranlar-aluvantis',
      title: 'Aluvantis Restoranlar & Kafelar',
      category: 'Kutilmoqda',
      metric: 'HoReCa Tizimi',
      badge: 'Yangi Startap',
      domain: 'restoran.aluvantis.uz',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      summary: 'Restoranlar, kafelar va milliy taomlar maskanlari uchun yagona avtomatlashtirilgan QR-menyu, oshxona boshqaruvi va yetkazib berish ekotizimi.',
      liveUrl: 'https://restoran.aluvantis.uz',
      status: 'coming_soon',
    },
    {
      id: 'dacha-top',
      title: 'Dacha Top — Dala Hovlilar Ijarasi',
      category: 'Kutilmoqda',
      metric: 'Rent & Bron',
      badge: 'Yangi Startap',
      domain: 'dachatop.aluvantis.uz',
      image: '/src/assets/images/dacha_top_showcase_1790572491874.jpg',
      summary: 'Toshkent viloyati, Chorvoq, Chimyon va Bo\'stonliqdagi dala hovli, dacha va dam olish maskanlarini vositachisiz, to\'g\'ridan-to\'g\'ri ijaraga olish platformasi.',
      liveUrl: 'https://dachatop.aluvantis.uz',
      status: 'coming_soon',
    },
  ] as CaseItem[],
  pricing: {
    title: 'Narxlar',
    subtitle: 'Bozor narxidan past. Yashirin to\'lovlar yo\'q. Hosting umrbod bepul.',
    plans: [
      {
        id: 'start',
        name: 'START',
        target: 'Bitta sahifali vizitka sayt yoki qahvaxona uchun',
        price: '1 200 000 so\'m',
        period: 'bir martalik to\'lov',
        features: [
          '48 soatda topshirish',
          'Mobil va kompyuterga moslashgan',
          'Telegram orqali buyurtma qabul qilish',
          'Umrbod bepul hosting',
          '1 oylik bepul qo\'llab-quvvatlash',
        ],
        cta: 'Start tanlash',
      },
      {
        id: 'biznes',
        name: 'BIZNES',
        target: 'Kafe, do\'kon va xizmat ko\'rsatish sohalari uchun',
        price: '2 400 000 so\'m',
        period: 'bir martalik to\'lov',
        isPopular: true,
        features: [
          '48 soatda topshirish',
          'Onlayn katalog yoki to\'liq menyu',
          'Telegram bot integratsiyasi',
          'Umrbod bepul hosting',
          'Google va Yandex xaritalarga ulash',
          '3 oylik bepul qo\'llab-quvvatlash',
        ],
        cta: 'Biznes tanlash',
      },
      {
        id: 'pro',
        name: 'PRO',
        target: 'Katta assortimentli do\'kon va tarmoqlar uchun',
        price: '3 900 000 so\'m',
        period: 'bir martalik to\'lov',
        features: [
          '72 soatda topshirish',
          'To\'liq savdo katalogi va filtrlar',
          'To\'lov tizimlari (Click, Payme)',
          'Telegram orqali buyurtmalar boshqaruvi',
          'Umrbod bepul hosting',
          '6 oylik bepul qo\'llab-quvvatlash',
        ],
        cta: 'Pro tanlash',
      },
    ] as PricingPlan[],
  },
  faq: {
    title: 'Ko\'p beriladigan savollar',
    subtitle: 'Har bir savolga ochiq va aniq javob beramiz.',
    items: [
      {
        question: '48 soatda haqiqatdanmi?',
        answer: 'Ha, roppa-rosa 48 soatda. Bizda tayyor tekshirilgan arxitektura mavjud. Birinchi kuni materiallarni olamiz, ikkinchi kuni saytni to\'liq ishga tushirib sizga topshiramiz.',
      },
      {
        question: 'Hosting nima uchun bepul?',
        answer: 'Biz zamonaviy bulutli serverlardan foydalanamiz. Ular kichik va o\'rta biznes saytlari uchun cheksiz bepul resurs beradi. Siz hech qachon oylik server to\'lovi qilmaysiz.',
      },
      {
        question: 'Sayt qurilgandan keyin nima bo\'ladi?',
        answer: 'Sayt to\'liq sizning mulkingiz bo\'ladi. Matn yoki rasmni o\'zgartirish kerak bo\'lsa, Telegram orqali yozasiz — kafolat muddatida biz bepul yangilab beramiz.',
      },
      {
        question: 'Mobil versiya bormi?',
        answer: 'Albatta. Toshkentdagi mijozlarning 85% dan ortig\'i saytga telefondan kiradi. Barcha tugmalar, menyu va buyurtma shakllari telefon ekraniga moslashtiriladi.',
      },
      {
        question: 'To\'lov qanday?',
        answer: 'Avval 30% boshlang\'ich to\'lov, qolgan 70% esa sayt to\'liq tayyor bo\'lib sizga yoqqanidan keyin to\'lanadi. Click yoki Payme orqali to\'lashingiz mumkin.',
      },
    ] as FaqItem[],
  },
  ctaBand: {
    headline: 'Biznesingizni bugun onlayn qiling.',
    sub: '48 soatdan so\'ng birinchi mijozlaringizni yangi saytingiz orqali kutib oling.',
    button: 'Buyurtma berish',
  },
  footer: {
    contacts: '@aluvantis_admin • blog.aluvantis.uz • +998 99 845 66 32',
    copyright: '© 2026 Aluvantis. Toshkent.',
    tagline: 'Kafe, do\'kon va go\'zallik salonlari uchun tezkor veb-saytlar.',
    instagram: '@aluvantis',
    instagramLink: 'https://instagram.com/aluvantis',
    telegramAdmin: '@aluvantis_admin',
    telegramAdminLink: 'https://t.me/aluvantis_admin',
    telegramChannel: '@aluvantis',
    telegramChannelLink: 'https://t.me/aluvantis',
    blog: 'blog.aluvantis.uz',
    blogLink: 'https://blog.aluvantis.uz',
    phone: '+998 99 845 66 32',
    phoneLink: 'tel:+998998456632',
  },
  ishlarPage: {
    title: 'Loyihalarimiz & Startaplar.',
    sub: 'Aluvantis jamoasi tomonidan ishga tushirilgan faol platformalar va kutilayotgan startaplar ekotizimi.',
    bottomCtaTitle: 'O\'z startapingiz yoki biznesingizni biz bilan yarating.',
    bottomCtaButton: 'Hamkorlik / Buyurtma',
    categories: ['Barchasi', 'Faol Platformalar', 'Kutilayotgan Startaplar'] as const,
  },
  buyurtmaPage: {
    title: 'Keling, boshlaymiz.',
    sub: 'Qisqa shaklni to\'ldiring. 15 daqiqa ichida siz bilan bog\'lanamiz va loyihani muhokama qilamiz.',
    form: {
      nameLabel: 'Ismingiz',
      namePlaceholder: 'Rustam Aliyev',
      phoneLabel: 'Telefon raqamingiz',
      phonePlaceholder: '+998 99 845 66 32',
      typeLabel: 'Biznes turi',
      types: ['Kafe', "Do'kon", 'Salon', 'Boshqa'] as const,
      detailsLabel: 'Nima kerak?',
      detailsPlaceholder: 'Qisqacha ayting: mahsulotlar, qancha sahifa, qanday imkoniyatlar kerak...',
      submitButton: 'Yuborish',
      submitting: 'Yuborilmoqda...',
      successTitle: 'Rahmat! 1 soat ichida Telegram\'da yozamiz.',
      successSub: 'Mutaxassisimiz loyihangiz bo\'yicha dastlabki takliflarni tayyorlab yuboradi.',
      sideTitle: 'Yoki Telegram: @aluvantis_admin',
      sideSub: 'To\'g\'ridan-to\'g\'ri Telegram orqali yozishingiz ham mumkin. Biz har kuni soat 9:00 dan 21:00 gacha aloqadamiz.',
      directTelegramLink: 'https://t.me/aluvantis_admin',
      backToHome: 'Bosh sahifaga qaytish',
    },
  },
};
