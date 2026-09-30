/**
 * @file Ishlar.tsx
 * @description Case studies portfolio page featuring 6 client showcases, category filtering, GSAP staggered scroll reveals, and conversion CTA.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CaseCard } from '../components/CaseCard';
import { MagneticButton } from '../components/MagneticButton';
import { uzCopy, CaseItem } from '../copy/uz';
import { useSeo } from '../hooks/useSeo';

gsap.registerPlugin(ScrollTrigger);

export const Ishlar: React.FC = () => {
  useSeo({
    title: 'Aluvantis — Amalga oshirilgan loyihalar portfeli',
    description: "Toshkentdagi do'konlar, kafe va go'zallik salonlari uchun 48 soatda yaratilgan professional, zamonaviy veb-saytlar va erishilgan natijalar.",
    image: '/src/assets/images/case_rayhon_milliy_1790507955189.jpg',
    path: '/ishlar',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredCases: CaseItem[] =
    selectedCategory === 'Barchasi'
      ? uzCopy.cases
      : selectedCategory === 'Faol Platformalar'
      ? uzCopy.cases.filter((c) => c.status === 'active')
      : selectedCategory === 'Kutilayotgan Startaplar'
      ? uzCopy.cases.filter((c) => c.status === 'coming_soon')
      : uzCopy.cases.filter((c) => c.category === selectedCategory);

  // GSAP stagger on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridContainerRef.current?.querySelectorAll('article');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, gridContainerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-linen pt-28 pb-20 selection:bg-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {/* Page Header */}
        <header className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-button bg-teal-50 border border-teal/15 text-teal text-xs font-display font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Portfeli</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-teal tracking-tight">
            {uzCopy.ishlarPage.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-obsidian/80 mt-4 leading-relaxed">
            {uzCopy.ishlarPage.sub}
          </p>

          {/* Category Filter Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5" role="tablist">
            {uzCopy.ishlarPage.categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`sweep-btn px-5 py-2.5 rounded-button font-display text-xs sm:text-sm font-semibold shadow-xs transition-all ${
                    isActive
                      ? 'sweep-btn-teal is-active'
                      : 'sweep-btn-outline bg-white text-obsidian/90'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* 6 Case Studies Grid (2 cols desktop, 1 col mobile) */}
        <div
          ref={gridContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {filteredCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-20 sm:mt-28 p-8 sm:p-14 rounded-card bg-teal text-linen border border-teal-900 shadow-card text-center flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-linen tracking-tight max-w-xl">
            {uzCopy.ishlarPage.bottomCtaTitle}
          </h2>

          <p className="font-body text-sm sm:text-base text-linen/80 mt-3 max-w-md">
            Siz ham 48 soat ichida zamonaviy va mijoz keltiradigan veb-sayt egasi bo'ling.
          </p>

          <div className="mt-8">
            <Link to="/buyurtma" tabIndex={-1}>
              <MagneticButton variant="gold" size="lg">
                <span>{uzCopy.ishlarPage.bottomCtaButton}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
