/**
 * @file App.tsx
 * @description Root application component with react-router-dom routing, Framer Motion page transitions, Lenis smooth scroll, and layout shell.
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiChatbot } from './components/GeminiChatbot';
import { Landing } from './pages/Landing';
import { Ishlar } from './pages/Ishlar';
import { CaseDetail } from './pages/CaseDetail';
import { Buyurtma } from './pages/Buyurtma';
import { Admin } from './pages/Admin';
import { useLenis } from './hooks/useLenis';

/**
 * ScrollToTopHandler handles smooth scrolling to anchor hash or top of page on route change.
 */
function ScrollToTopHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow DOM elements to mount
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

/**
 * AnimatedRoutes handles Framer Motion page transitions with AnimatePresence
 */
function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeIn' as const },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/ishlar" element={<Ishlar />} />
          <Route path="/ishlar/:id" element={<CaseDetail />} />
          <Route path="/buyurtma" element={<Buyurtma />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  // Initialize Lenis smooth scroll and GSAP sync
  useLenis();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-linen text-obsidian font-body antialiased">
        <ScrollToTopHandler />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <GeminiChatbot />
      </div>
    </BrowserRouter>
  );
}
