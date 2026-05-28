import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CreatorOS — AI Growth Copilot for Content Creators',
  description:
    'Transform your content ideas into viral social media packages using AI. SEO optimization, captions, trends, thumbnails, and virality analysis powered by Google Gemini.',
  keywords: ['AI', 'content creator', 'YouTube SEO', 'Instagram captions', 'viral content', 'Gemini AI'],
  openGraph: {
    title: 'CreatorOS — AI Growth Copilot',
    description: 'Turn any content idea into viral social media content with AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans bg-dark-950 text-white antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#8b5cf6', secondary: '#fff' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
