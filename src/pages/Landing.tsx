/**
 * @file Landing.tsx
 * @description Landing page containing Hero with Anime.js SVG morph & GSAP text-sweep, Stats bar, Qanday ishlaydi, pinned horizontal case preview, Pricing, FAQ, and CTA band.
 */

import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import { ArrowUpRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { StatCounter } from '../components/StatCounter';
import { StaggerContainer, StaggerItem } from '../components/StaggerReveal';
import { CaseCard } from '../components/CaseCard';
import { PricingCard } from '../components/PricingCard';
import { FaqAccordion } from '../components/FaqAccordion';
import { uzCopy, PricingPlan } from '../copy/uz';
import { useSeo } from '../hooks/useSeo';

gsap.registerPlugin(ScrollTrigger);

export const Landing: React.FC = () => {
  useSeo({
    title: 'Aluvantis — Biznesingiz onlayn, 48 soatda',
    description: "Toshkentda kafe, do'kon va salonlar uchun professional veb-saytlar. Hosting umrbod bepul. 48 soatda ishga tushiramiz.",
    path: '/',
  });

  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const morphSvgRef = useRef<SVGSVGElement | null>(null);
  const pinnedSectionRef = useRef<HTMLElement | null>(null);
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null);

  // 1. GSAP Headline text-sweep & Hero Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline text sweep gradient animation
      if (heroHeadlineRef.current) {
        gsap.fromTo(
          heroHeadlineRef.current,
          { backgroundPosition: '0% 50%' },
          {
            backgroundPosition: '100% 50%',
            duration: 3.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      }

      const isDesktop = window.innerWidth >= 1024;

      // Hero visual slow scroll parallax (desktop only)
      if (isDesktop && heroVisualRef.current && heroRef.current) {
        gsap.to(heroVisualRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Initial staggered entrance animation
      gsap.from('.hero-reveal-text', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
      });

      // Desktop Pinned Horizontal Scroll on Ishlar Preview
      if (isDesktop && pinnedSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const totalScroll = track.scrollWidth - track.clientWidth;

        if (totalScroll > 0) {
          gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger: pinnedSectionRef.current,
              pin: true,
              scrub: 1,
              start: 'top 12%',
              end: () => `+=${totalScroll + 200}`,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  // 2. Interactive 3D Mouse Parallax and perspective tilting
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.innerWidth < 1024 || ('ontouchstart' in window)) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();
      const xVal = (clientX - left - width / 2) / (width / 2); // Normalized coordinates (-1 to 1)
      const yVal = (clientY - top - height / 2) / (height / 2); // Normalized coordinates (-1 to 1)

      // 3D perspective tilt on the SVG geometric canvas
      gsap.to('.hero-visual-3d', {
        rotationY: xVal * 16,
        rotationX: -yVal * 16,
        x: xVal * 20,
        y: yVal * 20,
        transformPerspective: 1200,
        ease: 'power2.out',
        duration: 0.7
      });

      // Opposite parallax translation on the glowing color blur backing
      gsap.to('.hero-glow-back', {
        x: -xVal * 40,
        y: -yVal * 40,
        ease: 'power2.out',
        duration: 0.9
      });

      // Independent float suspending on the 48h fast-delivery badge
      gsap.to('.hero-badge-float', {
        x: xVal * 32,
        y: yVal * 32,
        rotation: xVal * 8,
        ease: 'power3.out',
        duration: 0.6
      });
    };

    // Clean mouse movements reset when cursor leaves the hero block
    const handleMouseLeave = () => {
      gsap.to(['.hero-visual-3d', '.hero-glow-back', '.hero-badge-float'], {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 3. Anime.js SVG Geometric Morph in Hero Right Section (Desktop only)
  useEffect(() => {
    if (!morphSvgRef.current || window.innerWidth < 1024) return;

    const morphAnim = anime({
      targets: morphSvgRef.current.querySelectorAll('.morph-path'),
      d: [
        { value: 'M40,20 Q80,5 120,40 T200,80 T160,160 T80,180 T20,120 Z' },
        { value: 'M50,30 Q100,10 150,50 T180,110 T140,170 T60,150 T30,90 Z' },
        { value: 'M30,40 Q90,20 140,30 T190,90 T150,180 T70,160 T10,100 Z' },
      ],
      rotate: [0, 15, -15, 0],
      scale: [1, 1.05, 0.96, 1],
      duration: 7000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });

    const orbitAnim = anime({
      targets: morphSvgRef.current.querySelectorAll('.orbit-dot'),
      translateY: [-12, 12],
      translateX: [-8, 8],
      duration: 3200,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      delay: anime.stagger(250),
    });

    return () => {
      morphAnim.pause();
      orbitAnim.pause();
    };
  }, []);

  const handleSelectPlan = (plan: PricingPlan) => {
    navigate(`/buyurtma?plan=${plan.id}`);
  };

  const previewCases = uzCopy.cases;

  return (
    <div className="flex flex-col min-h-screen bg-linen selection:bg-gold/30">
      {/* 2. HERO SECTION */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linen"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Copy & CTAs) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Headline with GSAP text sweep */}
            <h1
              ref={heroHeadlineRef}
              className="hero-reveal-text text-sweep-headline font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.08] text-teal"
            >
              {uzCopy.hero.headline}
            </h1>

            {/* Subtitle in Inter */}
            <p className="hero-reveal-text font-body text-base sm:text-lg lg:text-xl text-obsidian/80 mt-6 max-w-2xl leading-relaxed">
              {uzCopy.hero.sub}
            </p>

            {/* Two Action Buttons */}
            <div className="hero-reveal-text mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link to="/buyurtma" tabIndex={-1} className="w-full sm:w-auto">
                <MagneticButton variant="gold" size="lg" className="w-full sm:w-auto">
                  <span>{uzCopy.hero.primaryCta}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </Link>

              <Link to="/ishlar" tabIndex={-1} className="w-full sm:w-auto">
                <MagneticButton variant="outline" size="lg" className="w-full sm:w-auto">
                  <span>{uzCopy.hero.secondaryCta}</span>
                </MagneticButton>
              </Link>
            </div>

            {/* Micro guarantees */}
            <div className="hero-reveal-text mt-10 pt-6 border-t border-teal/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-body text-obsidian/70">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                <span>48 soat ichida tayyor</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 text-teal flex-shrink-0" />
                <span>Umrbod bepul hosting</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-teal flex-shrink-0" />
                <span>Bozor narxidan 50% arzon</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Geometric Art (Anime.js morph) + Preview composition */}
          <div
            ref={heroVisualRef}
            className="lg:col-span-5 relative flex items-center justify-center select-none"
          >
            <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
              {/* Soft decorative background glow (opposite parallax shift) */}
              <div className="hero-glow-back absolute inset-0 bg-gradient-to-tr from-teal/20 via-gold/20 to-transparent rounded-full filter blur-3xl opacity-80 pointer-events-none" />

              {/* Anime.js Morphing SVG Canvas (3D tilt-perspective) */}
              <div className="hero-visual-3d w-full h-full">
                <svg
                  ref={morphSvgRef}
                  viewBox="0 0 220 220"
                  className="w-full h-full filter drop-shadow-2xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background organic shape */}
                  <path
                    className="morph-path"
                    d="M40,20 Q80,5 120,40 T200,80 T160,160 T80,180 T20,120 Z"
                    fill="#0E4F4F"
                    fillOpacity="0.88"
                  />

                  {/* Accent gold overlay ribbon */}
                  <path
                    d="M60,40 Q130,20 170,80 T130,170 T50,140 Z"
                    fill="#C6A15B"
                    fillOpacity="0.85"
                  />

                  {/* Geometric glass card layer */}
                  <rect
                    x="45"
                    y="65"
                    width="130"
                    height="90"
                    rx="16"
                    fill="#FFFFFF"
                    fillOpacity="0.92"
                    stroke="#0E4F4F"
                    strokeWidth="1.5"
                    strokeOpacity="0.2"
                  />

                  {/* Mock UI lines inside card */}
                  <rect x="60" y="82" width="65" height="10" rx="5" fill="#0E4F4F" />
                  <rect x="60" y="100" width="100" height="6" rx="3" fill="#C6A15B" />
                  <rect x="60" y="112" width="80" height="6" rx="3" fill="#14201F" fillOpacity="0.3" />
                  <rect x="60" y="128" width="45" height="12" rx="6" fill="#C6A15B" />

                  {/* Floating orbit dots */}
                  <circle className="orbit-dot" cx="30" cy="80" r="8" fill="#C6A15B" />
                  <circle className="orbit-dot" cx="195" cy="60" r="10" fill="#0E4F4F" />
                  <circle className="orbit-dot" cx="170" cy="190" r="7" fill="#C6A15B" />
                </svg>
              </div>

              {/* Floating 48h Badge (Independent suspended parallax float) */}
              <div className="hero-badge-float absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 p-3 sm:p-4 rounded-2xl bg-white border border-teal/15 shadow-cardHover backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-display font-extrabold text-gold text-sm animate-pulse">
                  48
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-teal">
                    Tezkor topshirish
                  </div>
                  <div className="font-body text-[11px] text-obsidian/60">
                    2 kun ichida onlayn
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BAR (Teal Surface, Gold Numerals) */}
      <section
        id="stats"
        className="bg-teal py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-teal-900 shadow-inner"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {uzCopy.stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              id={`stat-counter-${idx}`}
              targetValue={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </section>

      {/* 4. "QANDAY ISHLAYDI" SECTION (Motion Stagger Reveal) */}
      <section id="qanday-ishlaydi" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-teal tracking-tight">
              {uzCopy.howItWorks.title}
            </h2>
            <p className="font-body text-base sm:text-lg text-obsidian/75 mt-3">
              {uzCopy.howItWorks.subtitle}
            </p>
          </div>

          <StaggerContainer
            id="how-it-works-stagger"
            staggerChildren={0.18}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {uzCopy.howItWorks.steps.map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full p-8 rounded-card bg-white border border-teal/10 shadow-card hover:shadow-cardHover transition-all flex flex-col justify-between group cursor-default hover:-translate-y-1.5 duration-350">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal flex items-center justify-center font-display font-extrabold text-lg border border-teal/10 group-hover:bg-teal group-hover:text-linen transition-all duration-300 group-hover:rotate-6">
                      {step.step}
                    </div>

                    <h3 className="font-display font-bold text-xl text-teal mt-6 tracking-tight group-hover:text-gold transition-colors">
                      {step.title}
                    </h3>

                    <p className="font-body text-sm sm:text-base text-obsidian/75 mt-3 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-linen flex items-center text-xs font-display font-semibold text-gold">
                    <span>Bosqich {idx + 1} / 3</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. ISHLAR PREVIEW (Horizontal Pinned Scroll Desktop / Stack Mobile) */}
      <section
        ref={pinnedSectionRef}
        id="ishlar-preview"
        className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linen overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-teal tracking-tight">
                {uzCopy.worksPreview.title}
              </h2>
              <p className="font-body text-base text-obsidian/75 mt-2">
                {uzCopy.worksPreview.subtitle}
              </p>
            </div>

            <Link
              to="/ishlar"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-teal hover:text-gold transition-colors"
            >
              <span>{uzCopy.worksPreview.viewAll}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Desktop Horizontal Pinned Container / Mobile Grid */}
          <div
            ref={horizontalTrackRef}
            className="flex flex-col lg:flex-row gap-8 lg:w-max lg:pr-24"
          >
            {previewCases.map((item) => (
              <div
                key={item.id}
                className="w-full lg:w-[420px] flex-shrink-0"
              >
                <CaseCard
                  item={item}
                  onSelect={() => navigate(`/ishlar/${item.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NARXLAR (3 Tier Cards) */}
      <section id="narxlar" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-teal tracking-tight">
              {uzCopy.pricing.title}
            </h2>
            <p className="font-body text-base sm:text-lg text-obsidian/75 mt-3">
              {uzCopy.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {uzCopy.pricing.plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (Motion Accordion) */}
      <section id="faq" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-teal tracking-tight">
              {uzCopy.faq.title}
            </h2>
            <p className="font-body text-base text-obsidian/75 mt-3">
              {uzCopy.faq.subtitle}
            </p>
          </div>

          <FaqAccordion items={uzCopy.faq.items} />
        </div>
      </section>

      {/* 8. CTA BAND (Obsidian Surface) */}
      <section id="cta-band" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-obsidian text-linen relative overflow-hidden">
        {/* Subtle accent gold glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold/15 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-linen tracking-tight max-w-2xl">
            {uzCopy.ctaBand.headline}
          </h2>

          <p className="font-body text-base sm:text-lg text-linen/75 mt-4 max-w-xl">
            {uzCopy.ctaBand.sub}
          </p>

          <div className="mt-10">
            <Link to="/buyurtma" tabIndex={-1}>
              <MagneticButton variant="gold" size="lg">
                <span>{uzCopy.ctaBand.button}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
