/**
 * @file CaseCard.tsx
 * @description Case study card component featuring anime.js progress bar and motion lift physics.
 */

import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import anime from 'animejs';
import { ArrowUpRight } from 'lucide-react';
import { CaseItem } from '../copy/uz';

interface CaseCardProps {
  item: CaseItem;
  className?: string;
  id?: string;
  onSelect?: () => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ item, className = '', id, onSelect }) => {
  const navigate = useNavigate();
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      navigate(`/ishlar/${item.id}`);
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      anime({
        targets: progressBarRef.current,
        scaleX: [0, 1],
        easing: 'easeOutExpo',
        duration: 900,
        delay: 200,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (progressBarRef.current) {
      anime({
        targets: progressBarRef.current,
        opacity: [0.7, 1],
        height: ['3px', '5px'],
        duration: 250,
        easing: 'easeOutQuad',
      });
    }
  };

  const handleMouseLeave = () => {
    if (progressBarRef.current) {
      anime({
        targets: progressBarRef.current,
        opacity: 0.7,
        height: '3px',
        duration: 250,
        easing: 'easeOutQuad',
      });
    }
  };

  const getCategoryBadgeClass = (category: string, status?: string) => {
    if (status === 'coming_soon' || category.includes('Kutilmoqda')) {
      return 'bg-amber-100/90 text-amber-900 border-amber-300 font-bold';
    }
    if (category.includes('Moda') || category.includes('E-Commerce')) {
      return 'bg-[#FDF5E6] text-[#8B6508] border-[#8B6508]/20';
    }
    if (category.includes('ERP') || category.includes('Biznes')) {
      return 'bg-blue-50 text-blue-900 border-blue-200';
    }
    return 'bg-[#E6F0F0] text-teal border-teal/20';
  };

  return (
    <motion.article
      id={id || `case-${item.id}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98, y: -2 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative flex flex-col bg-white rounded-card cursor-pointer overflow-hidden border border-teal/10 shadow-card hover:shadow-cardHover transition-all ${className}`}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-linen">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span
            className={`px-3 py-1 rounded-button text-xs font-display font-medium border shadow-xs ${getCategoryBadgeClass(item.category, item.status)}`}
          >
            {item.category}
          </span>
          <span className="px-3 py-1 rounded-button text-xs font-display font-bold bg-gold text-obsidian shadow-sm border border-[#b8934d]/30">
            {item.badge}
          </span>
        </div>

        {/* Metric Pill & Domain */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-button bg-obsidian/85 backdrop-blur-xs border border-white/15 text-linen text-xs font-display font-semibold">
            <span className={`w-2 h-2 rounded-full ${item.status === 'coming_soon' ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
            <span>{item.metric}</span>
          </div>

          {item.domain && (
            <span className="text-[11px] font-mono text-linen/90 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10 hidden sm:inline-block">
              {item.domain}
            </span>
          )}
        </div>
      </div>

      {/* Anime.js animated progress bar */}
      <div className="relative w-full bg-linen/80 h-[3px] overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-teal via-gold to-teal origin-left opacity-75"
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-bold text-lg sm:text-xl text-teal group-hover:text-gold transition-colors tracking-tight">
              {item.title}
            </h3>
            <div className="p-2 rounded-full bg-linen text-teal group-hover:bg-teal group-hover:text-linen transition-colors flex-shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="font-body text-sm text-obsidian/75 mt-2.5 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-linen flex items-center justify-between text-xs text-obsidian/60 font-body">
          <span>Toshkent, O'zbekiston</span>
          <span className="font-display font-medium text-teal group-hover:underline">
            Saytni ko'rish →
          </span>
        </div>
      </div>
    </motion.article>
  );
};
