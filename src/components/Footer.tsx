/**
 * @file Footer.tsx
 * @description Obsidian surface footer with studio coordinates, contact handles, and copyright notice.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { uzCopy } from '../copy/uz';
import { Instagram, Send, Globe, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const f = uzCopy.footer;
  return (
    <footer className="bg-obsidian text-linen pt-16 pb-12 border-t border-teal-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Logo & Tagline Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/1000008392-removebg-preview.png"
                alt="Aluvantis emblem"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto max-w-[48px] sm:max-w-[56px] object-contain flex-shrink-0 filter brightness-110"
              />
              <span className="font-display font-extrabold text-2xl text-linen tracking-tighter">
                {uzCopy.meta.brandName}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-linen/70 mt-4 max-w-sm leading-relaxed">
              {f.tagline}
            </p>
          </div>

          {/* Navigatsiya Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-sm font-bold text-gold uppercase tracking-wider">
              Navigatsiya
            </h4>
            <nav className="flex flex-col gap-2.5 font-body text-xs sm:text-sm text-linen/80" aria-label="Pastki menyu">
              <Link to="/" className="hover:text-gold transition-colors w-fit">
                Bosh sahifa
              </Link>
              <Link to="/ishlar" className="hover:text-gold transition-colors w-fit">
                Ishlar
              </Link>
              <a href="/#narxlar" className="hover:text-gold transition-colors w-fit">
                Narxlar
              </a>
              <a href="/#faq" className="hover:text-gold transition-colors w-fit">
                FAQ
              </a>
              <Link to="/admin" className="text-teal-400 hover:text-teal-300 font-semibold w-fit flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>admin.aluvantis.uz</span>
              </Link>
              <Link to="/buyurtma" className="text-gold hover:underline font-semibold w-fit">
                Buyurtma berish
              </Link>
            </nav>
          </div>

          {/* Socials & Contacts Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-display text-sm font-bold text-gold uppercase tracking-wider">
              Aloqa & Tarmoqlar
            </h4>
            <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-linen/80">
              <a
                href={f.phoneLink}
                className="flex items-center gap-2.5 hover:text-gold transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>{f.phone} (Aloqa)</span>
              </a>
              <a
                href={f.telegramAdminLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-gold transition-colors w-fit"
              >
                <Send className="w-4 h-4 text-gold shrink-0" />
                <span>Telegram: {f.telegramAdmin} (Admin)</span>
              </a>
              <a
                href={f.telegramChannelLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-gold transition-colors w-fit"
              >
                <Send className="w-4 h-4 text-gold shrink-0" />
                <span>Telegram kanal: aluvantis</span>
              </a>
              <a
                href={f.instagramLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-gold transition-colors w-fit"
              >
                <Instagram className="w-4 h-4 text-gold shrink-0" />
                <span>Instagram: {f.instagram}</span>
              </a>
              <a
                href={f.blogLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-gold transition-colors w-fit"
              >
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>Yangiliklar blogi: {f.blog}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-linen/50">
          <p>{f.copyright}</p>
          <div className="flex items-center gap-1">
            <span>Toshkent raqamli studiyasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
