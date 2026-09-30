/**
 * @file Navbar.tsx
 * @description Double Floating Liquid Glass Navbar (iOS liquid glass aesthetic) split into two sleek floating pills.
 * Left pill: Refined emblem + brand name.
 * Right pill: Desktop links + Sweep CTA + Mobile animated toggle.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { ArrowUpRight, Phone, Send, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { uzCopy } from '../copy/uz';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogoHover = () => {
    if (!logoImgRef.current) return;

    anime({
      targets: logoImgRef.current,
      rotate: [0, -8, 8, -4, 0],
      scale: [1, 1.14, 1],
      easing: 'easeInOutQuad',
      duration: 600,
    });
  };

  const navLinks = [
    { label: uzCopy.nav.works, to: '/ishlar' },
    { label: uzCopy.nav.pricing, to: '/#narxlar' },
    { label: uzCopy.nav.faq, to: '/#faq' },
  ];

  return (
    <>
      {/* Outer Floating Bar Header */}
      <header
        className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-400 ease-out ${
          isScrolled ? 'top-2.5 sm:top-4' : 'top-3.5 sm:top-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between pointer-events-auto">
          {/* =========================================================
              PILL 1 (LEFT): BRAND ISLAND
             ========================================================= */}
          <Link
            to="/"
            onMouseEnter={handleLogoHover}
            onTouchStart={handleLogoHover}
            className={`group flex items-center gap-2 sm:gap-2.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 ${
              isScrolled ? 'liquid-glass-scrolled' : 'liquid-glass'
            } hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal`}
            aria-label="Aluvantis bosh sahifa"
          >
            {/* Reduced compact emblem - crisp and unobtrusive */}
            <img
              ref={logoImgRef}
              src="/1000008392-removebg-preview.png"
              alt="Aluvantis emblem"
              referrerPolicy="no-referrer"
              className="h-6 sm:h-7 w-auto max-w-[26px] sm:max-w-[30px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-xs"
            />

            {/* Reduced elegant brand typography */}
            <span className="font-display font-bold text-xs sm:text-base text-teal tracking-tight group-hover:text-gold transition-colors whitespace-nowrap">
              {uzCopy.meta.brandName}
            </span>
          </Link>

          {/* =========================================================
              PILL 2 (RIGHT): NAVIGATION & ACTIONS ISLAND
             ========================================================= */}
          <div
            className={`flex items-center gap-1.5 sm:gap-4 rounded-full px-2 sm:px-3 py-1.5 transition-all duration-300 ${
              isScrolled ? 'liquid-glass-scrolled' : 'liquid-glass'
            }`}
          >
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 px-2" aria-label="Asosiy menyu">
              {navLinks.map((link) => {
                const isAnchor = link.to.includes('#');
                const isActive = location.pathname === link.to;

                return isAnchor ? (
                  <a
                    key={link.label}
                    href={link.to}
                    className="font-body text-xs lg:text-sm font-medium text-obsidian/75 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`font-body text-xs lg:text-sm font-medium transition-colors ${
                      isActive ? 'text-teal font-semibold' : 'text-obsidian/75 hover:text-teal'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Order Button - Desktop & Mobile with Sweep Effect */}
            <Link to="/buyurtma" tabIndex={-1} className="flex-shrink-0">
              <MagneticButton
                variant="gold"
                size="sm"
                className="text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 font-display font-bold shadow-xs"
              >
                <span>{uzCopy.nav.orderCta}</span>
                <ArrowUpRight className="w-3 h-3 hidden sm:inline-block ml-0.5" />
              </MagneticButton>
            </Link>

            {/* Mobile Animated Hamburger / Close Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1 bg-teal/5 hover:bg-teal/10 active:scale-90 transition-all text-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal border border-teal/10"
              aria-label={isMobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-4 h-0.5 bg-teal rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-teal rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-teal rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE DRAWER MODAL & BACKDROP (Liquid Glass)
         ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-obsidian/30 backdrop-blur-xs md:hidden"
            />

            {/* Floating Liquid Glass Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 sm:top-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-50 liquid-glass-scrolled rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/80 md:hidden"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-teal/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-teal">
                    Aluvantis Menyusi
                  </span>
                </div>
                <span className="text-[11px] font-body text-obsidian/60 bg-teal/5 px-2.5 py-0.5 rounded-full border border-teal/10">
                  48 soatda tayyor
                </span>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col py-3 divide-y divide-teal/5">
                {navLinks.map((link) => {
                  const isAnchor = link.to.includes('#');
                  return isAnchor ? (
                    <a
                      key={link.label}
                      href={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-base font-medium text-teal hover:text-gold transition-colors py-3 flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-teal/40" />
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-base font-medium text-teal hover:text-gold transition-colors py-3 flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-teal/40" />
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions & Contacts */}
              <div className="pt-3 border-t border-teal/10 flex flex-col gap-3">
                <Link
                  to="/buyurtma"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="sweep-btn sweep-btn-gold w-full flex items-center justify-center gap-2 py-3 rounded-button font-display font-bold text-sm shadow-card"
                >
                  <span>{uzCopy.hero.primaryCta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {/* Quick Contacts Row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={uzCopy.footer.telegramAdminLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal/5 hover:bg-teal/10 text-teal text-xs font-semibold border border-teal/10 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-teal" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={uzCopy.footer.phoneLink}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal/5 hover:bg-teal/10 text-teal text-xs font-semibold border border-teal/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal" />
                    <span>Qo'ng'iroq</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
