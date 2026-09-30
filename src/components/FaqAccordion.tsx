/**
 * @file FaqAccordion.tsx
 * @description Accessible accordion component with motion expand/collapse transitions for FAQ items.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../copy/uz';

interface FaqAccordionProps {
  items: FaqItem[];
  id?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, id }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id={id} className="w-full max-w-3xl mx-auto divide-y divide-teal/10">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const itemId = `faq-item-${idx}`;
        const contentId = `faq-content-${idx}`;

        return (
          <div key={idx} className="py-5 sm:py-6">
            <button
              id={itemId}
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
            >
              <span className="font-display font-bold text-base sm:text-lg text-teal group-hover:text-gold transition-colors tracking-tight">
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-gold text-obsidian' : 'bg-linen text-teal group-hover:bg-teal group-hover:text-linen'
                }`}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={itemId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm sm:text-base text-obsidian/75 pt-3 sm:pt-4 pr-10 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
