/**
 * @file LeadForm.tsx
 * @description Lead-capture order form with business type selector, anime.js celebratory confetti, and telegram handoff.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import anime from 'animejs';
import { Send, CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';
import { uzCopy } from '../copy/uz';

interface FormDataState {
  name: string;
  phone: string;
  businessType: 'Kafe' | "Do'kon" | 'Salon' | 'Boshqa';
  customBusinessType?: string;
  details: string;
}

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    phone: '',
    businessType: 'Kafe',
    customBusinessType: '',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const confettiCanvasRef = useRef<HTMLDivElement | null>(null);

  const fireConfetti = () => {
    const container = confettiCanvasRef.current;
    if (!container) return;

    // Clear previous particles
    container.innerHTML = '';

    const colors = ['#C6A15B', '#0E4F4F', '#14201F', '#E6F0F0'];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement('div');
      const size = Math.floor(Math.random() * 8) + 6;
      const isCircle = Math.random() > 0.5;

      el.style.position = 'absolute';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = isCircle ? '50%' : '2px';
      el.style.left = '50%';
      el.style.top = '40%';
      el.style.pointerEvents = 'none';

      container.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 80;
      const destinationX = Math.cos(angle) * velocity;
      const destinationY = Math.sin(angle) * velocity;

      anime({
        targets: el,
        translateX: destinationX,
        translateY: destinationY + 60,
        rotate: Math.random() * 720 - 360,
        scale: [1, 0],
        opacity: [1, 0],
        duration: Math.random() * 900 + 800,
        easing: 'easeOutCirc',
        complete: () => {
          el.remove();
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    if (formData.businessType === 'Boshqa' && !formData.customBusinessType?.trim()) return;

    setIsSubmitting(true);

    // Simulate reliable studio submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      fireConfetti();
    }, 600);
  };

  const formCopy = uzCopy.buyurtmaPage.form;

  return (
    <div className="relative w-full">
      {/* Anime.js Confetti Particle Canvas */}
      <div
        ref={confettiCanvasRef}
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-card bg-[#FAF8F5] border-2 border-teal/20 shadow-card flex flex-col gap-6"
          >
            {/* Ism */}
            <div className="flex flex-col gap-2">
              <label htmlFor="client-name" className="font-display text-sm font-semibold text-teal">
                {formCopy.nameLabel} <span className="text-gold">*</span>
              </label>
              <input
                id="client-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={formCopy.namePlaceholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-teal/20 text-obsidian placeholder:text-obsidian/40 font-body text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
              />
            </div>

            {/* Telefon */}
            <div className="flex flex-col gap-2">
              <label htmlFor="client-phone" className="font-display text-sm font-semibold text-teal">
                {formCopy.phoneLabel} <span className="text-gold">*</span>
              </label>
              <input
                id="client-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={formCopy.phonePlaceholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-teal/20 text-obsidian placeholder:text-obsidian/40 font-body text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
              />
            </div>

            {/* Biznes turi chips */}
            <div className="flex flex-col gap-2.5">
              <label className="font-display text-sm font-semibold text-teal">
                {formCopy.typeLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup">
                {formCopy.types.map((type) => {
                  const isSelected = formData.businessType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setFormData({ ...formData, businessType: type })}
                      className={`sweep-btn px-3.5 py-2.5 rounded-button text-xs sm:text-sm font-display font-medium shadow-xs transition-all ${
                        isSelected
                          ? 'sweep-btn-teal is-active'
                          : 'sweep-btn-outline bg-white text-obsidian/90'
                      }`}
                    >
                      <span>{type}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Business Type Input */}
              <AnimatePresence>
                {formData.businessType === 'Boshqa' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="flex flex-col gap-1.5 pt-1.5">
                      <label htmlFor="custom-business-type" className="font-display text-xs font-semibold text-teal/85">
                        O'zingiz yozing <span className="text-gold">*</span>
                      </label>
                      <input
                        id="custom-business-type"
                        type="text"
                        required
                        value={formData.customBusinessType || ''}
                        onChange={(e) => setFormData({ ...formData, customBusinessType: e.target.value })}
                        placeholder="Masalan: O'quv markazi, Logistika..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-teal/20 text-obsidian placeholder:text-obsidian/40 font-body text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nima kerak textarea */}
            <div className="flex flex-col gap-2">
              <label htmlFor="client-details" className="font-display text-sm font-semibold text-teal">
                {formCopy.detailsLabel}
              </label>
              <textarea
                id="client-details"
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder={formCopy.detailsPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-teal/20 text-obsidian placeholder:text-obsidian/40 font-body text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none"
              />
            </div>

            {/* Submit button */}
            <div className="mt-2">
              <MagneticButton
                type="submit"
                variant="gold"
                size="lg"
                disabled={isSubmitting}
                className="w-full py-4 text-sm sm:text-base font-display font-bold disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  formCopy.submitting
                ) : (
                  <>
                    <span>{formCopy.submitButton}</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-card bg-white border-2 border-gold shadow-cardHover text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-teal" />
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-teal tracking-tight">
              {formCopy.successTitle}
            </h3>

            <p className="font-body text-sm sm:text-base text-obsidian/75 max-w-md leading-relaxed">
              {formCopy.successSub}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={formCopy.directTelegramLink}
                target="_blank"
                rel="noreferrer"
                className="sweep-btn sweep-btn-teal gap-2 px-6 py-3 font-display text-xs sm:text-sm font-semibold shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Telegram'dan yozish</span>
              </a>

              <Link
                to="/"
                className="sweep-btn sweep-btn-outline gap-2 px-6 py-3 font-display text-xs sm:text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{formCopy.backToHome}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
