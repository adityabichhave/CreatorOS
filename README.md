# 🚀 CreatorOS — AI Growth Copilot for Content Creators

> Transform raw ideas into viral-ready social media content using AI.

CreatorOS is a modern AI-powered SaaS platform that helps creators generate SEO-optimized YouTube content, viral Instagram captions, trend insights, thumbnail concepts, and virality analysis using Google Gemini AI.

---

## 🌐 Live Demo

https://creator-os-delta-fawn.vercel.app

---

## ✨ Features

| Feature                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| 🎯 AI Generator        | Generate titles, descriptions, tags, captions, hashtags, and Shorts hooks |
| 📊 Virality Analyzer   | AI-powered virality scoring with retention & CTR prediction               |
| 🔥 Trend Explorer      | Discover trending opportunities and rising niches                         |
| 🖼️ Thumbnail Studio   | Generate thumbnail concepts, prompts, and compositions                    |
| 🔍 Competitor Analyzer | Analyze successful YouTube videos and viral psychology                    |
| 📋 History             | Save and revisit previous generations                                     |
| ⚙️ Settings            | API configuration and personalization                                     |

---

# 🛠️ Tech Stack

## Frontend

* Next.js 14
* React 18
* TypeScript
* Tailwind CSS
* Framer Motion

## Backend

* Next.js API Routes
* Google Gemini AI

## Styling

* Glassmorphism UI
* Dark futuristic design
* Animated gradients
* Smooth transitions

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/adityabichhave/CreatorOS.git
cd CreatorOS
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env.local`

```env
GEMINI_API_KEY=your_api_key_here
```

Get Gemini API key:
https://aistudio.google.com/app/apikey

---

## 4. Start Development Server

```bash
npm run dev
```

Open:
http://localhost:3000

---

# 📁 Advanced Project Architecture

```bash
src/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   ├── trends/
│   │   ├── virality/
│   │   ├── thumbnail/
│   │   └── competitor/
│   │
│   ├── dashboard/
│   │   ├── generator/
│   │   ├── trends/
│   │   ├── virality/
│   │   ├── thumbnail/
│   │   ├── competitor/
│   │   ├── history/
│   │   └── settings/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── landing/
│   ├── dashboard/
│   ├── cards/
│   ├── charts/
│   ├── animations/
│   └── ui/
│
├── features/
│   ├── seo-generator/
│   ├── trend-explorer/
│   ├── virality-engine/
│   ├── thumbnail-studio/
│   └── competitor-analysis/
│
├── lib/
│   ├── gemini.ts
│   ├── prompts.ts
│   ├── constants.ts
│   └── utils.ts
│
├── services/
├── hooks/
├── store/
├── styles/
├── public/
└── types/
```

---

# 🎨 UI / UX Highlights

* Modern AI SaaS dashboard
* Animated gradients & glow effects
* Glassmorphism cards
* Responsive creator-focused UI
* Smooth page transitions
* Premium dark mode experience

---

# 🔌 API Endpoints

| Endpoint          | Description                          |
| ----------------- | ------------------------------------ |
| `/api/generate`   | Generate complete AI content package |
| `/api/virality`   | Analyze virality & engagement        |
| `/api/trends`     | Explore trending topics              |
| `/api/thumbnail`  | Generate thumbnail concepts          |
| `/api/competitor` | Analyze competitor videos            |

---

# 🚢 Deployment

## Deploy on Vercel

```bash
npx vercel
```

Add:

```env
GEMINI_API_KEY=your_api_key
```

inside Vercel Environment Variables.

---

# 💡 Vision

CreatorOS aims to become:

# “The AI Operating System for Content Creators”

Helping creators:

* optimize growth
* improve engagement
* understand virality
* create faster
* scale content intelligently

---

# ⭐ Future Improvements

* AI thumbnail image generation
* YouTube Analytics integration
* Multi-platform publishing
* AI script enhancement
* Trend prediction engine
* Team collaboration tools

---

# 👨‍💻 Author

## Aditya Kumar Bichhave

Built with ❤️ using Next.js + Google Gemini AI
