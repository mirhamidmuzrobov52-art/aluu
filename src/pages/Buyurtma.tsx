/**
 * @file Buyurtma.tsx
 * @description Lead capture and order placement page with custom order form and Telegram quick contact sidebar.
 */

import React from 'react';
import { MessageCircle, Clock, ShieldCheck, PhoneCall } from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { uzCopy } from '../copy/uz';
import { useSeo } from '../hooks/useSeo';

export const Buyurtma: React.FC = () => {
  useSeo({
    title: 'Aluvantis — Saytga buyurtma berish',
    description: "Biznesingiz uchun professional sayt buyurtma qiling. 48 soatda bepul hosting, Telegram integratsiyasi va yuqori tezlikdagi zamonaviy dizayn tayyor bo'ladi.",
    path: '/buyurtma',
  });

  return (
    <div className="flex flex-col min-h-screen bg-linen pt-28 pb-24 selection:bg-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-button bg-teal-50 border border-teal/15 text-teal text-xs font-display font-semibold mb-4">
            <span>Yangi loyiha</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-teal tracking-tight">
            {uzCopy.buyurtmaPage.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-obsidian/80 mt-4 leading-relaxed">
            {uzCopy.buyurtmaPage.sub}
          </p>
        </header>

        {/* 2-Column Layout: Form + Studio Contact Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Form Column */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>

          {/* Side Column: Telegram & Guarantees */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Telegram Direct Card */}
            <div className="p-7 sm:p-8 rounded-card bg-teal text-linen border border-teal-900 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-gold text-obsidian flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>

              <h2 className="font-display font-bold text-xl text-linen tracking-tight">
                {uzCopy.buyurtmaPage.form.sideTitle}
              </h2>

              <p className="font-body text-sm text-linen/80 mt-3 leading-relaxed">
                {uzCopy.buyurtmaPage.form.sideSub}
              </p>

              <div className="mt-6 pt-5 border-t border-linen/15">
                <a
                  href={uzCopy.buyurtmaPage.form.directTelegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="sweep-btn sweep-btn-gold w-full py-3.5 px-6 font-display font-bold text-sm shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Telegram orqali yozish</span>
                </a>
              </div>
            </div>

            {/* Studio Commitment & Value Points */}
            <div className="p-6 sm:p-7 rounded-card bg-white border border-teal/15 shadow-card flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-teal">
                    48 soatlik kafolat
                  </h3>
                  <p className="font-body text-xs text-obsidian/70 mt-0.5 leading-relaxed">
                    Kerakli materiallar olinganidan so'ng sayt 48 soat ichida to'liq ishga tushiriladi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-linen">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-teal">
                    100% xavfsiz to'lov
                  </h3>
                  <p className="font-body text-xs text-obsidian/70 mt-0.5 leading-relaxed">
                    Boshlang'ich 30%, qolgani sayt tayyor bo'lib ma'qullanganidan so'ng.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-linen">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-teal">
                    Bepul maslahat
                  </h3>
                  <p className="font-body text-xs text-obsidian/70 mt-0.5 leading-relaxed">
                    Sizning biznesingizga mos arxitektura va funksiyalar bo'yicha bepul yo'nalish beramiz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
