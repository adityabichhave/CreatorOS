# 🚀 CreatorOS — AI Growth Copilot for Content Creators

> **Hackathon-winning AI SaaS platform** that transforms raw content ideas into complete viral social media packages using Google Gemini AI.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-blue?logo=google)](https://aistudio.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **AI Generator** | Complete content package: titles, descriptions, captions, hashtags, hooks |
| 📊 **Virality Analyzer** | 7-dimension AI virality scoring with circular progress charts |
| 🔥 **Trend Explorer** | Discover viral opportunities and rising niches by category |
| 🖼️ **Thumbnail Studio** | AI-generated thumbnail concepts with composition, color, and prompts |
| 🔍 **Competitor Analyzer** | Deep psychological analysis of any YouTube video |
| 📋 **History** | All past generations with virality scores saved |
| ⚙️ **Settings** | API key config, profile, appearance, and notification preferences |

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS v3
- **Animations**: Framer Motion (page transitions, cards, loaders, progress)
- **AI Backend**: Google Gemini 1.5 Flash via `@google/generative-ai`
- **API**: Next.js App Router API Routes
- **Styling**: Glassmorphism, dark theme, purple/blue gradients
- **Notifications**: react-hot-toast

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd CreatorOS
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

> 🔑 Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design system CSS
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell (sidebar + topbar)
│   │   ├── page.tsx                # Dashboard home
│   │   ├── generator/page.tsx      # AI Content Generator
│   │   ├── trends/page.tsx         # Trend Explorer
│   │   ├── virality/page.tsx       # Virality Analyzer
│   │   ├── thumbnail/page.tsx      # Thumbnail Studio
│   │   ├── competitor/page.tsx     # Competitor Analyzer
│   │   ├── history/page.tsx        # Content History
│   │   └── settings/page.tsx       # Settings
│   └── api/
│       ├── generate/route.ts       # Content generation endpoint
│       ├── virality/route.ts       # Virality analysis endpoint
│       ├── trends/route.ts         # Trend exploration endpoint
│       ├── thumbnail/route.ts      # Thumbnail concepts endpoint
│       └── competitor/route.ts     # Competitor analysis endpoint
├── components/
│   ├── landing/                    # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── LandingFooter.tsx
│   ├── dashboard/                  # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── GeneratorResults.tsx
│   └── ui/                         # Shared UI primitives
│       ├── LoadingSpinner.tsx       # Spinner, AIThinking, Skeleton
│       ├── CopyButton.tsx          # Copy to clipboard button
│       └── CircularProgress.tsx    # SVG progress rings + score bars
├── lib/
│   ├── gemini.ts                   # All Gemini API service functions
│   └── utils.ts                   # cn, copyToClipboard, formatters
└── types/
    └── index.ts                   # All TypeScript interfaces
```

## 🎨 Design System

- **Dark theme** with `#060b14` base
- **Purple/Blue gradient** (`#8b5cf6` → `#3b82f6`)
- **Glassmorphism** cards with backdrop blur
- **Animated** blobs, gradient backgrounds, and scroll reveals
- **Custom scrollbar**, glow effects, shimmer loaders

## 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/generate` | POST | Generate complete content package |
| `/api/virality` | POST | Analyze virality scores |
| `/api/trends` | POST | Explore trending topics |
| `/api/thumbnail` | POST | Generate thumbnail concepts |
| `/api/competitor` | POST | Analyze competitor video |

## 🚢 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Add `GEMINI_API_KEY` to your Vercel environment variables.

### Build for Production

```bash
npm run build
npm start
```

---

Built with ❤️ for content creators. Powered by Google Gemini AI.
