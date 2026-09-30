/**
 * @file PricingCard.tsx
 * @description Transparent pricing tier card with feature checklist and magnetic gold CTA.
 */

import React from 'react';
import { Check, Star } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { PricingPlan } from '../copy/uz';

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (plan: PricingPlan) => void;
  id?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan, id }) => {
  return (
    <div
      id={id || `plan-${plan.id}`}
      className={`relative flex flex-col justify-between p-7 sm:p-9 rounded-card transition-all duration-300 ${
        plan.isPopular
          ? 'bg-white border-2 border-gold shadow-cardHover scale-[1.02] lg:-translate-y-2 z-10'
          : 'bg-white/90 border border-teal/15 shadow-card hover:border-teal/30 hover:shadow-cardHover'
      }`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-button bg-gold text-obsidian font-display text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-obsidian" />
          <span>Eng ommabop</span>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-2xl text-teal tracking-tight">
            {plan.name}
          </h3>
          <span className="text-xs font-display px-2.5 py-1 rounded-button bg-teal-50 text-teal font-medium">
            48-72 soat
          </span>
        </div>

        <p className="font-body text-xs sm:text-sm text-obsidian/70 mt-2 min-h-[38px] leading-relaxed">
          {plan.target}
        </p>

        {/* Price display */}
        <div className="mt-6 pt-5 border-t border-linen">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-teal">
              {plan.price}
            </span>
          </div>
          <span className="text-xs font-body text-obsidian/60 block mt-0.5">
            {plan.period} • oylik to'lovlarsiz
          </span>
        </div>

        {/* Feature List */}
        <ul className="mt-7 space-y-3.5" role="list">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-body text-obsidian/85">
              <div className="w-5 h-5 rounded-full bg-teal-50 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-8 pt-6 border-t border-linen">
        <MagneticButton
          variant={plan.isPopular ? 'gold' : 'teal'}
          size="md"
          className="w-full"
          onClick={() => onSelectPlan(plan)}
        >
          {plan.cta}
        </MagneticButton>
      </div>
    </div>
  );
};
