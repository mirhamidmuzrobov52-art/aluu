/**
 * @file CaseDetail.tsx
 * @description Dedicated Case Detail & Showcase Page for Aluvantis platforms and startups.
 */

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, 
  Sparkles, ExternalLink, Globe, MapPin, Star, Phone, 
  ChevronRight, Laptop, Check, Zap, Layers 
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { uzCopy, CaseItem } from '../copy/uz';
import { useSeo } from '../hooks/useSeo';

interface PlatformDetails {
  headline: string;
  purpose: string;
  whoIsItFor: string;
  keyBenefits: string[];
  specs: { label: string; value: string }[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

const PLATFORM_DETAILS: Record<string, PlatformDetails> = {
  'durda-uz': {
    headline: 'Yurak shaklidagi toza tabiiy sariyog\' durdasi — qadimiy Samarqand retsepti va 3 ta sof tabiiy tarkib',
    purpose: 'DURDA (durda.uz) — O\'zbekistonning an\'anaviy yurak shaklidagi toza tabiiy sariyog\' durdasi brendi. Cho\'yan qozonda sekin olovda 4-5 soat qaynatilgan, atigi 3 ta toza tarkibdan (toza qatiq, yangi sut qaymog\'i va tabiiy osh tuzi) iborat shifobaxsh, to\'yimli va halol milliy sut konsentrati. "Hozirgacha bu durdani faqat oilamiz yegan" shiori ostida Toshkent va viloyatlarga sovuq zanjir (izotermik termo-qutilar) orqali yetkaziladi.',
    whoIsItFor: 'Tabiiy, toza va halol milliy taomlarni qadrlovchi insonlar, oilaviy choyxona va nonushta dasturxoni uchun shifobaxsh sariyog\' durdasi xaridorlari.',
    keyBenefits: [
      '100% tabiiy va sof: Shakar, konservantlar va sun\'iy qo\'shimchalar mutlaqo yo\'q',
      'Cho\'yan qozonda sekin olovda 4-5 soat davomida tayyorlangan qadimiy Samarqand retsepti',
      'Maxsus oziq-ovqat po\'lat qoliplariga quyilgan nafis yurak shakli: sariyog\' va mayin karamellashgan durda qatlamlari',
      'Yetkazishda sovuq zanjir: 0…+5°C haroratdagi izotermik termo-qutilarda eshikkacha yetkazish',
      'Telegram (@durda_uz), Instagram (@durda.uz) va durda.uz orqali buyurtma qabul qilish'
    ],
    specs: [
      { label: 'Rasmiy sayt', value: 'durda.uz' },
      { label: 'Tarkibi', value: 'Qatiq, Qaymoq, Osh tuzi (100% tabiiy)' },
      { label: 'Tayyorlanish vaqti', value: '4-5 soat sekin olovda' },
      { label: 'Qolipi', value: 'Yurak shakli (Food-grade steel)' }
    ],
    quote: {
      text: "Hozirgacha bu durdani faqat oilamiz yegan. Endi xalqimiz uchun toza sariyog', qaymoq va qatiqdan tayyorlangan shifobaxsh durdani yurak shaklida yetkazmoqdamiz!",
      author: 'DURDA Milliy Brendi',
      role: 'Asoschilar jamoasi'
    }
  },
  'sakinward': {
    headline: 'Islomiy ruhiy xotirjamlik, Qur\'on tadabburi va sun\'iy intellektli ma\'naviy yo\'ldosh platformasi',
    purpose: 'Sakinward (sakinwardapp.aluvantis.uz) — «Sokinlik va ma\'naviyat» shiori ostida inson qalbiga orom bag\'ishlovchi zamonaviy islomiy ilova. Platforma o\'z ichiga DeepSeek asosidagi aqlli islomiy suhbatdosh — Sakin AI, to\'liq Qur\'oni Karim qiroatini tabiat sadolari (yomg\'ir, Makka shabadasi, daryo, sokin tun) bilan birgalikda tinglash imkoniyati, Toshkent va viloyatlar bo\'yicha jonli astronomik namoz vaqtlari, interaktiv 3D tasbeh hamda Qibla kompasini jamlagan.',
    whoIsItFor: 'Har kuni ruhiy xotirjamlik, Qur\'on oyatlari tadabburi, zikrlar va namoz vaqtlarini aniq bilishni istagan har bir inson uchun.',
    keyBenefits: [
      'Sakin AI — Qur\'on oyatlari, hadislar va ma\'naviy masalalarda tezkor, asosli va sokin javob beruvchi sun\'iy intellektli yo\'ldosh',
      'Qur\'on Audio & Tabiat Ambiyansi: 15+ jahon qorilari tilovati va yomg\'ir, Makka, daryo, shabada ovozlari bilan qalb oromi',
      'Astronomik namoz vaqtlari: GPS va quyosh burchagi asosida soniyasigacha aniq hisob-kitob va namozni 0 dan o\'rganish darsliklari',
      'Interaktiv Tasbeh & Kundalik Zikrlar: Ertalabki va kechki zikrlar, Allohning 99 go\'zal ismi va shaxsiy zikr hisoblagichi',
      'Qibla kompasi va Hijriy taqvim: Telefonni Ka\'baga to\'g\'ri yo\'naltiruvchi jonli kompas va qamariy sana'
    ],
    specs: [
      { label: 'Rasmiy ilova domeni', value: 'sakinwardapp.aluvantis.uz' },
      { label: 'Shiori', value: '«Sokinlik va ma\'naviyat»' },
      { label: 'Sun\'iy intellekt', value: 'Sakin AI (DeepSeek)' },
      { label: 'Imkoniyatlar', value: 'Qur\'on Audio + Tabiat sadolari + Namoz + Tasbeh' }
    ],
    quote: {
      text: "«Albatta, Allohning zikri ila qalblar orom olur» (Ra'd surasi, 28). Sakinward kundalik hayot shoshqaloqligida qalbingizga haqiqiy sokinlik va ma'naviy orom bag'ishlaydi.",
      author: 'Sakinward Jamoasi',
      role: 'Sokinlik va ma\'naviyat platformasi'
    }
  },
  'aluvantis-erp': {
    headline: 'Omborxona, tovarlar oqimi (Keldi, Chiqdi, Qoldiq) va moliyani boshqaruvchi intellektual ERP tizimi',
    purpose: 'Aluvantis ERP — O\'zbekiston korxona va omborlari uchun tovarlar kirim-chiqimini real vaqtda qayd etuvchi, qoldiqlarni hisoblaydigan va 12 ta avtonom aqlli agent (Hisobchi, Qo\'riqchi, Bashoratchi va h.k.) orqali kamomadlarning oldini oluvchi yagona boshqaruv markazi.',
    whoIsItFor: 'Omborxonaga ega ishlab chiqarish sexlari, ulgurji savdo bazalari, qurilish mollari do\'konlari va distribyutorlik kompaniyalari uchun.',
    keyBenefits: [
      'Omborxona real vaqtdagi aniq qoldiqlari (Sement, Armatura, Profil va h.k.)',
      'Oddiy va tushunarli tilda tovar oqimi: Keldi, Chiqdi, Ko\'chdi',
      'Xavf va tanqisliklarni oldindan ko\'rsatuvchi bashorat moduli',
      'Kam qolgan tovarlar bo\'yicha avtomatik Telegram ogohlantirishlari',
      'Bir kompaniya ma\'lumotlarini boshqalardan mutlaq izolyatsiya qiluvchi xavfsizlik'
    ],
    specs: [
      { label: 'Rasmiy domen', value: 'erp.aluvantis.uz' },
      { label: 'Autonomiya darajasi', value: 'L3 (Xavfsiz avtonom nazorat)' },
      { label: 'Integratsiyalar', value: 'Telegram Bot + Excel/1C eksport' },
      { label: 'Server holati', value: '99.9% Uptime' }
    ],
    quote: {
      text: "Aluvantis ERP tizimi orqali omborimizdagi har bir mahsulot qoldig'i aniq bo'ldi. Inson omilidan kelib chiqadigan xatolar va kamomadlar butunlay yo'qoldi!",
      author: 'Jamshid Rustamov',
      role: 'Omborxona va Logistika direktori'
    }
  },
  'aluvantis-ai-studio': {
    headline: 'Tabiiy tildagi so\'rov orqali veb-dastur va loyihalarni 10x tezroq yaratuvchi AI Program Builder',
    purpose: 'Aluvantis AI Studio — foydalanuvchining oddiy matnli tavsifini professional veb-dastur kodi, ma\'lumotlar sxemasi va interfeysiga aylantiruvchi innovatsion startap platformasi.',
    whoIsItFor: 'Startap asoschilari, dasturchilar va o\'z loyihalarini haftalab emas, bir necha soatda ishga tushirishni xohlagan bizneslar uchun.',
    keyBenefits: [
      'Tabiiy tildagi so\'rov orqali to\'liq arxitektura va kod sintezi',
      'Zamonaviy UI komponentlar va Tailwind CSS dizayni',
      'Bulutli serverga 1-bosishda avtomatik joylashtirish',
      'Multi-agentli xatoliklarni o\'zi tekshiruvchi AI tizimi'
    ],
    specs: [
      { label: 'Loyiha domeni', value: 'aistudio.aluvantis.uz' },
      { label: 'Holati', value: 'Kutilmoqda (Beta test 2026)' },
      { label: 'Dvigatel', value: 'Aluvantis Next-Gen AI' }
    ],
    quote: {
      text: "Dasturiy ta'minot yaratish tezligini tubdan o'zgartiruvchi vosita. Har qanday biznes o'z dasturiga oson ega bo'ladi.",
      author: 'Aluvantis AI R&D',
      role: 'Innovatsiyalar bo\'limi'
    }
  },
  'barber-studio': {
    headline: 'Barcha sartaroshxona va barberlarni yagona bazaga jamlagan agregator va navbat olish platformasi',
    purpose: 'Barber Studio — O\'zbekistondagi sartaroshxonalarni yagona xaritada birlashtirib, mijozlarga ustalarning portfoliosini ko\'rish, baholarni solishtirish va navbat kutmasdan oldindan vaqtni band qilish imkonini beradi.',
    whoIsItFor: 'Erkaklar sartaroshxonalari, mustaqil top-barberlar va o\'z vaqtini qadrlaydigan mijozlar uchun.',
    keyBenefits: [
      'Tumanlar bo\'yicha sartaroshxonalarni qulay qidirish va saralash',
      'Ustalarning real portfoliosi va tasdiqlangan mijozlar sharhlari',
      'Interaktiv bo\'sh vaqtlar jadvali orqali 1 daqiqada navbatga yozilish',
      'SMS va Telegram orqali avtomatik eslatma vaucheri'
    ],
    specs: [
      { label: 'Loyiha domeni', value: 'barber.aluvantis.uz' },
      { label: 'Holati', value: 'Kutilmoqda (Tez kunda)' },
      { label: 'Qamrov', value: 'Toshkent va viloyatlar' }
    ],
    quote: {
      text: "Mijozlar endi navbat kutib vaqt yo'qotmaydi, ustalar esa o'z kunlik ish rejasini oldindan bilib turishadi.",
      author: 'Barber Studio Jamoasi',
      role: 'Aluvantis Startups'
    }
  },
  'restoranlar-aluvantis': {
    headline: 'Kafelar, restoranlar va milliy taomlar maskanlari uchun aqlli QR-menyu va oshxona boshqaruvi',
    purpose: 'Aluvantis Restoranlar — stollardagi QR-kod orqali foto-taomnomani ochish, buyurtmani to\'g\'ridan-to\'g\'ri oshxona ekraniga (KDS) yetkazish va kassa jarayonlarini to\'liq avtomatlashtiruvchi zamonaviy HoReCa tizimi.',
    whoIsItFor: 'Milliy taomlar oshxonalari, kafelar, oilaviy restoranlar va yetkazib berish xizmatlari uchun.',
    keyBenefits: [
      'Hech qanday ilova o\'rnatmasdan brauzerda ochiladigan smart QR-menyu',
      'Oshpazlar uchun buyurtmalar navbati jonli ekrani (Kitchen Display System)',
      'Stollar bandligi va ofitsiantlar yuklamasini yengillashtirish',
      'Telegram bot orqali avtomatik yetkazib berish tizimi'
    ],
    specs: [
      { label: 'Loyiha domeni', value: 'restoran.aluvantis.uz' },
      { label: 'Holati', value: 'Kutilmoqda (HoReCa ekotizimi)' },
      { label: 'Xizmat turi', value: 'Smart QR & KDS boshqaruvi' }
    ],
    quote: {
      text: "Ofitsiantlar yugur-yuguridan xoli, mijozlar esa stolga o'tirishi bilanoq sevimli taomini 1 daqiqada buyurtma qiladi.",
      author: 'Aluvantis HoReCa',
      role: 'Mahsulot yo\'nalishi'
    }
  },
  'dacha-top': {
    headline: 'Toshkent viloyati, Chorvoq va Chimyondagi dacha va dam olish maskanlarini ijaraga olish platformasi',
    purpose: 'Dacha Top — Chorvoq suv ombori, Bo\'stonliq soylari va Chimyon tog\'laridagi eng shinam dala hovli va dam olish maskanlarini vositachilarsiz, to\'g\'ridan-to\'g\'ri ijaraga olish imkonini beruvchi mahalliy platforma.',
    whoIsItFor: 'Tog\' bag\'rida dam olishni rejalashtirgan oilalar, do\'stlar davralari hamda o\'z dala hovlisini ishonchli mijozlarga ijaraga bermoqchi bo\'lgan dacha egalari uchun.',
    keyBenefits: [
      'Isitiladigan qishki va yozgi basseynlar, sauna va sharoitlar bo\'yicha aniq filtr',
      'Dachalarning 100% tekshirilgan va haqiqiy fotosuratlari',
      'Bo\'sh kunlarni kalendarda ko\'rib, to\'g\'ridan-to\'g\'ri bron qilish',
      'Vositachilarsiz, shaffof va adolatli kunlik narxlar'
    ],
    specs: [
      { label: 'Loyiha domeni', value: 'dachatop.aluvantis.uz' },
      { label: 'Holati', value: 'Kutilmoqda (Ijaraga berish platformasi)' },
      { label: 'Hududlar', value: 'Chorvoq, Chimyon, Bo\'stonliq' }
    ],
    quote: {
      text: "Dacha izlab soatlab e'lonlar oralab yurish shart emas. Bir joyda barcha shinam villalar va to'g'ridan-to'g'ri bron tizimi!",
      author: 'Dacha Top Jamoasi',
      role: 'Aluvantis Startups'
    }
  }
};

export const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caseItem = uzCopy.cases.find((c) => c.id === id) || uzCopy.cases[0];
  const details = PLATFORM_DETAILS[caseItem.id] || PLATFORM_DETAILS['sakinward'];

  useSeo({
    title: `${caseItem.title} — ${caseItem.domain} | Aluvantis Portfolio`,
    description: caseItem.summary,
    path: `/ishlar/${caseItem.id}`,
  });

  return (
    <div className="flex flex-col min-h-screen bg-linen pt-28 pb-20 font-body selection:bg-gold/30">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-obsidian/60">
          <Link to="/" className="hover:text-teal transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-obsidian/40" />
          <Link to="/ishlar" className="hover:text-teal transition-colors">Loyihalar & Startaplar</Link>
          <ChevronRight className="w-3.5 h-3.5 text-obsidian/40" />
          <span className="text-teal font-semibold truncate max-w-[200px] sm:max-w-none">{caseItem.title}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Navigation & Fast Platform Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <Link 
            to="/ishlar" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-semibold text-teal hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Barcha platformalarga qaytish</span>
          </Link>

          {/* Quick Platform Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-obsidian/50 whitespace-nowrap uppercase tracking-wider">
              Loyihalar:
            </span>
            {uzCopy.cases.map(c => (
              <button
                key={c.id}
                onClick={() => navigate(`/ishlar/${c.id}`)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  c.id === caseItem.id
                    ? 'bg-teal text-linen shadow-sm'
                    : 'bg-white hover:bg-white/80 text-obsidian/70 border border-teal/10'
                }`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Hero Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-teal/10 shadow-card relative overflow-hidden mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-teal/10 text-teal border border-teal/15">
                  {caseItem.category}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#C6A15B] text-obsidian shadow-2xs flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-obsidian" />
                  <span>{caseItem.domain}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-display font-bold border ${
                  caseItem.status === 'coming_soon'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {caseItem.status === 'coming_soon' ? '🚀 Kutilayotgan Startap' : '● Faol Platforma'}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-teal tracking-tight leading-tight">
                {caseItem.title}
              </h1>

              <p className="font-body text-sm sm:text-base text-obsidian/80 leading-relaxed">
                {details.headline}
              </p>
            </div>

            {/* Direct Link Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {caseItem.status === 'active' ? (
                <a
                  href={caseItem.liveUrl || `https://${caseItem.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <MagneticButton variant="gold" size="md" className="w-full justify-center">
                    <span>Platformaga tashrif buyurish</span>
                    <ExternalLink className="w-4 h-4 ml-1.5" />
                  </MagneticButton>
                </a>
              ) : (
                <Link to="/buyurtma">
                  <MagneticButton variant="gold" size="md" className="w-full justify-center">
                    <span>Shunday startap yaratish</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 1:1 High-Fidelity Showcase Mockup Screen */}
        <div className="mb-12">
          <div className="bg-[#121617] rounded-3xl p-3 sm:p-5 border border-teal/20 shadow-2xl overflow-hidden">
            {/* Browser chrome header bar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-1 rounded-full border border-white/10 text-xs font-mono text-linen/70 max-w-[280px] sm:max-w-md truncate">
                <Globe className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="truncate">https://{caseItem.domain}</span>
              </div>

              <div className="text-[11px] text-linen/40 font-mono hidden sm:inline-block">
                Aluvantis Cloud
              </div>
            </div>

            {/* High-Fidelity 1:1 Visual Mockup */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mt-3 bg-obsidian group">
              <img
                src={caseItem.image}
                alt={caseItem.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-display font-bold text-linen bg-teal/90 px-3.5 py-1.5 rounded-xl backdrop-blur-xs border border-white/10 shadow-lg">
                  ⚡ 1:1 Rasmiy Dizayn & Arxitektura
                </span>
                <span className="text-xs font-mono text-linen bg-black/70 px-3 py-1.5 rounded-xl backdrop-blur-xs border border-white/10">
                  {caseItem.domain}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Explanation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mission, Target Audience, Key Benefits */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* What is this platform? */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal/10 shadow-card">
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-teal uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Platforma haqida qisqacha</span>
              </div>
              <h3 className="font-display font-bold text-xl text-teal">Bu qanday platforma va nima vazifani bajaradi?</h3>
              <p className="font-body text-sm sm:text-base text-obsidian/85 mt-3 leading-relaxed">
                {details.purpose}
              </p>

              <div className="mt-6 pt-5 border-t border-linen">
                <div className="text-xs font-display font-bold text-obsidian/60 uppercase tracking-wider">
                  Kimlar uchun mo'ljallangan?
                </div>
                <p className="font-body text-sm text-obsidian/80 mt-1 leading-relaxed">
                  {details.whoIsItFor}
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal/10 shadow-card">
              <h3 className="font-display font-bold text-xl text-teal mb-5">
                Asosiy afzalliklari va imkoniyatlari:
              </h3>
              <div className="space-y-3">
                {details.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-linen/50 border border-teal/5">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-obsidian/85 font-medium leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client / Founder Quote */}
            <div className="bg-teal text-linen rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
              <div className="flex items-center gap-1 mb-3 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-body text-base sm:text-lg text-linen/95 italic leading-relaxed">
                "{details.quote.text}"
              </p>
              <div className="mt-5 pt-4 border-t border-linen/15">
                <div className="font-display font-bold text-sm text-gold">{details.quote.author}</div>
                <div className="font-body text-xs text-linen/70 mt-0.5">{details.quote.role}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specs & Action Card */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            <div className="bg-white rounded-3xl p-6 border border-teal/10 shadow-card space-y-5">
              <h4 className="font-display font-bold text-base text-teal">Texnik ko'rsatkichlar</h4>
              <div className="space-y-3">
                {details.specs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-linen/50 border border-teal/5">
                    <div className="text-[11px] text-obsidian/60 font-body">{spec.label}</div>
                    <div className="font-display font-bold text-xs sm:text-sm text-teal mt-0.5 font-mono">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-linen space-y-3">
                <p className="text-xs text-obsidian/75 leading-relaxed">
                  Siz ham o'z biznesingiz yoki startapingiz uchun xuddi shunday professional platformaga ega bo'lishni xohlaysizmi?
                </p>
                <Link to="/buyurtma" className="w-full block">
                  <MagneticButton variant="gold" size="md" className="w-full justify-center">
                    <span>Loyihani muhokama qilish</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
