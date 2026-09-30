# Aluvantis — Veb-studiya (Toshkent)

> "Biznesingiz onlayn — 48 soatda"

Production-ready marketing website for **Aluvantis**, a Tashkent-based web studio dedicated to launching high-converting websites for cafes, shops, and beauty salons within 48 hours with lifetime free hosting.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom brand book design tokens
- **Declarative Animations**: `motion` (motion.dev) — in-view reveals, staggered card grids, hover micro-states
- **Transitions & Gestures**: `framer-motion` — page routing transitions (`AnimatePresence`) and mobile drawer
- **Scroll & Typographic Physics**: `gsap` + `ScrollTrigger` — headline gradient text-sweep, hero parallax, desktop horizontal pinned scroll, magnetic cursor button physics, numeric counter on stats bar
- **Micro-interactions & Particles**: `animejs` — SVG geometric shape morphing, interactive progress indicators, celebratory confetti on form submission
- **Smooth Scroll**: `@studio-freight/lenis` synchronized with GSAP ScrollTrigger
- **Routing**: `react-router-dom` v6 (3 pages: `/`, `/ishlar`, `/buyurtma`)
- **Icons**: `lucide-react`
- **Class Utilities**: `clsx` + `tailwind-merge`

---

## 🎨 Brand Book Reference

### Color Palette
- **Teal** (`#0E4F4F`, Brunswick Green, `50: #E6F0F0`, `900: #0E4F4F`): Primary brand color for contrast surfaces, badges, and headings.
- **Gold** (`#C6A15B`, Doe Brown): Accent color for primary CTAs, active highlights, and numbers.
- **Linen** (`#F6F3EC`, Classic Linen): Warm, high-contrast canvas background.
- **Obsidian** (`#14201F`, Obsidian Black): Deep contrast surface for the footer and secondary accents.

### Typography
- **Headings (Display)**: `Unbounded`, serif (Weights: 400, 600, 800)
- **Body**: `Inter`, sans-serif (Weights: 400, 500, 600, 700)

### Border Radius & Shadows
- `borderRadius.card`: `20px`
- `borderRadius.button`: `9999px` (pill)
- `boxShadow.card`: `0 8px 32px rgba(14, 79, 79, 0.08)`
- `boxShadow.cardHover`: `0 16px 48px rgba(14, 79, 79, 0.14)`

---

## 🚀 Quick Start

### Installation

```bash
# Clone or initialize
npm create vite@latest aluvantis -- --template react-ts
cd aluvantis

# Install all dependencies
npm i tailwindcss postcss autoprefixer motion framer-motion gsap @studio-freight/lenis lucide-react react-router-dom clsx tailwind-merge animejs
npm i -D @types/animejs
```

### Development

```bash
npm run dev
```

The application runs on `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📱 Page Architecture

1. **Landing (`/`)**:
   - **Navbar**: Sticky navigation with scroll blur, anime.js logo micro-morph, and mobile drawer.
   - **Hero**: GSAP headline text-sweep ("Biznesingiz onlayn — 48 soatda"), slow parallax, anime.js geometric SVG morph, and dual CTAs.
   - **Stats Bar**: Teal surface with gold numeric counters scroll-triggered via GSAP.
   - **Qanday Ishlaydi**: 3-step studio workflow cards revealed with Motion stagger physics.
   - **Ishlar Preview**: Pinned horizontal scroll on desktop via GSAP ScrollTrigger; responsive stack on mobile.
   - **Narxlar**: 3 transparent pricing cards (Start, Biznes, Pro) with feature checklists and gold border highlight.
   - **FAQ**: Motion-powered accordion answering client timeline, hosting, and payment questions.
   - **CTA Band**: Obsidian surface driving orders.
   - **Footer**: Coordinates, telegram handles, and studio copyright.

2. **Ishlar (`/ishlar`)**:
   - Full case studies portfolio with 6 real Tashkent business showcases.
   - Category filtering (Kafe, Do'kon, Salon).
   - GSAP scroll-triggered staggered reveal.
   - Conversion band linking to `/buyurtma`.

3. **Buyurtma (`/buyurtma`)**:
   - High-conversion lead-capture order form.
   - Business category pill selector.
   - Anime.js celebratory confetti explosion on form submission.
   - Success state with direct Telegram fallback (`@aluvantis`).

---

## ♿ Accessibility & Motion

All animations respect the system-level accessibility preference:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```
Semantic HTML tags, ARIA attributes, and keyboard focus states are maintained across all interactive components.
