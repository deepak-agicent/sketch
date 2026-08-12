# Identix — Intelligence Forensic Facial Composite Workstation

![Identix Banner](https://img.shields.io/badge/IDENTIX-FORENSIC%20STUDIO-0284c7?style=for-the-badge&logo=shield)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**Identix** is a high-precision, web-based forensic face builder designed for law enforcement agencies, forensic sketch artists, intelligence teams, and investigators. It enables users to assemble, fine-tune, age-progression morph, and export forensic suspect composites with sub-millimeter precision.

---

## ✨ Key Features

- 👤 **Demographic Morphing Engine**:
  - Full gender selection (`Male`, `Female`, `Androgynous`).
  - Dynamic **Age Progression morphing** from 5 to 80 years old with real-time forehead, eye, and nasolabial crease rendering.
  - Multi-tone skin palette including Light, Warm Medium, Olive, Rich Brown, Deep Ebony, Forensic Wireframe, and Tactical Cyan.

- 🧩 **Modular Vector Anatomical Library**:
  - Over 100+ precision SVG vectors across 10 anatomical categories:
    - **Head Shapes**: Oval, Square, Round, Heart, Diamond, Tactical Chiseled.
    - **Hairstyles**: Receding, Buzz Cut, Side Part, Pompadour, Man Bun, Long Waves, Afro, Braids, Bob, Dreadlocks, Bald.
    - **Eyebrows**: Arch, Bushy, Tactical Angular, Unibrow, Slanted V, Feathered, Scarred.
    - **Eyes**: Almond, Hooded, Monolid, Cat-Eye, Deep Shadow, Squinting, Wide Pupil.
    - **Noses**: Straight, Button, Crooked/Broken, Roman Ridge, Aquiline Hooked, Broad.
    - **Mouths**: Neutral, Thin Stern, Smirk, Grin, Pout, Thick Upper.
    - **Ears**: Classic, Protruding, Pointed, Cauliflower, Attached, Pierced Rings.
    - **Beards & Stubble**: Heavy Stubble, Full Beard, Goatee, Handlebar, Pencil Stache.
    - **Glasses & Specs**: Tactical Aviators, Rectangle Wireframe, Round Specs.
    - **Facial Marks**: Cheek Scars, Forehead Wrinkles, Moles, Freckles, Eyebrow Cuts.

- 🎯 **Interactive Canvas & Micro-Tuning**:
  - **Drag-and-Drop**: Click and drag facial components directly on the high-contrast SVG canvas.
  - **Micro-Tuning Controls**: Adjust X/Y coordinates, scale, rotation, color tinting, and opacity.
  - **Ear Separation Distance**: Dedicated spacing slider for adjusting ear-to-ear clearance.
  - **Undo / Redo History**: Complete state history tracking for easy rollbacks.

- 📚 **100 Pre-Loaded Suspect Profiles**:
  - Built-in database of 100 suspect profiles (`suspect-1` to `suspect-100`).
  - Homepage gallery with live search, gender filters, and a **"View All 100 Suspect Profiles"** expansion system.
  - Automatic URL state hydration via `/draw?preset=suspect-id`.

- 📄 **Intelligence Dossier & High-Res PNG Export**:
  - Modal dossier export compiling suspect telemetry, case numbers, demographic metadata, and full-resolution PNG canvas downloads.

- 🔍 **SEO & Search Infrastructure**:
  - Configured Next.js Metadata API, OpenGraph social cards, Twitter Cards, Schema.org JSON-LD structured data, dynamic `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS design tokens (`globals.css`)
- **Icons**: Lucide React
- **Canvas Rendering**: SVG Vector Layering Engine + HTML-to-Image canvas exporter

---

## 📁 Repository Structure

```
sketch/
├── app/
│   ├── components/          # Reusable Forensic UI Components
│   │   ├── FaceCanvas.tsx        # Drag-and-drop SVG face renderer
│   │   ├── FeaturePicker.tsx     # Vector part selection grid
│   │   ├── FineTuneControls.tsx  # Micro-tuning & ear spacing sliders
│   │   ├── DemographicSelector.tsx # Gender, Age & Skin tone selector
│   │   └── DossierModal.tsx      # Intelligence report & PNG export modal
│   ├── draw/                # Main Forensic Studio Editor Route
│   │   └── page.tsx              # Draw Studio workstation page with URL hydration
│   ├── lib/                 # Core Business Logic & Forensic Engine
│   │   ├── face-parts.ts         # Vector SVG paths & part registry
│   │   ├── presets.ts            # 100 Suspect profile database generator
│   │   └── types.ts              # TypeScript interfaces & definitions
│   ├── favicon.ico              # Browser icon
│   ├── globals.css              # Custom styling & high-contrast design tokens
│   ├── icon.svg                 # Identix Shield emblem SVG favicon
│   ├── layout.tsx               # Root layout with SEO Metadata & JSON-LD
│   ├── page.tsx                 # Tactical Landing page with 100 suspect gallery
│   ├── robots.ts                # Dynamic search engine crawler rules
│   └── sitemap.ts               # Dynamic sitemap index (/ and /draw)
├── public/                  # Static assets
├── package.json             # Project dependencies & scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/identix-sketch.git
   cd sketch
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to start using Identix.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
