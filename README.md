# 🎬 Cine Classic Studios — Official Website

A premium, conversion-optimised studio rental website built with **Next.js 15**, **React 18**, **TypeScript**, and **Sanity CMS**. Features cinematic UI, full portfolio showcase, dynamic studio pages, and a CMS-powered backend so non-technical staff can update content without touching code.

---

## ✨ Features

- **9 Studio Sets** — Individual landing pages with galleries, specs & booking CTAs
- **Portfolio Page** — Filter by type (Film / TV / Web Series / Ads / Music Videos), click-to-expand modal
- **Sanity CMS** — Edit studios, facilities, testimonials, and productions from a visual dashboard
- **SEO-ready** — `generateMetadata` per page, Open Graph tags, semantic HTML
- **WhatsApp Booking** — Deep-link with pre-filled inquiry message
- **Scroll Reveal Animations** — IntersectionObserver-powered entrance effects
- **Responsive** — Mobile-first design across all breakpoints
- **Next.js Image Optimization** — Automatic WebP conversion & lazy loading

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Custom Properties + Inline Styles |
| Fonts | Playfair Display + Inter (next/font) |
| CMS | Sanity v3 |
| Images | next/image + Sanity CDN |
| Deployment | Vercel (recommended) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/cine-classic-nextjs.git
cd cine-classic-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

> Get these from your [Sanity project dashboard](https://sanity.io/manage)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
cine-classic-nextjs/
├── public/
│   └── images/
│       └── studios/          # Studio photos (hero.jpg, 1.jpg–6.jpg per set)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── portfolio/        # Portfolio page
│   │   └── studios/[slug]/   # Individual studio pages
│   ├── components/
│   │   ├── portfolio/        # Portfolio section components
│   │   └── studio/           # Studio page components
│   ├── data/
│   │   ├── productions.ts    # Film/TV production data
│   │   └── sets.ts           # Studio set definitions
│   └── lib/
│       └── sanity.ts         # Sanity client configuration
└── sanity/
    └── schemas/              # CMS content schemas
```

---

## 🎨 Adding Studio Photos

Place photos in `public/images/studios/<studio-slug>/`:

| File Name | Usage |
|---|---|
| `hero.jpg` | Full-width hero image (recommend 1920×1080) |
| `1.jpg` – `6.jpg` | Gallery images (recommend 1200×800) |

Studio slugs: `empty-floor`, `market-1`, `market-2`, `market-7`, `chawl-new`, `court-set`, `hospital-set`, `police-station`, `open-ground`

---

## 📝 Managing Content (Sanity CMS)

### Launch the Sanity Studio

```bash
cd sanity-studio
npm install
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) to access the visual CMS dashboard.

### What you can edit without coding:
- ✅ Studio names, descriptions, rates, and amenities
- ✅ Facilities and equipment lists
- ✅ Client testimonials
- ✅ Productions / portfolio items
- ✅ All images (hero photos, galleries)

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
3. Add environment variables in Vercel dashboard (same as `.env.local`)
4. Click **Deploy** — Vercel handles everything automatically

Every `git push` to `main` triggers an automatic redeploy.

---

## 📞 Contact

**Cine Classic Studios**
Mumbai, Maharashtra, India
WhatsApp: +91 XXXXX XXXXX
Email: info@cineclassicstudios.com

---

## 📄 License

Private repository — all rights reserved © Cine Classic Studios
