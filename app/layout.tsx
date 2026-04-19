import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MathSpark — Your personal algebra coach',
  description: 'An ADHD-friendly maths app for Luna — Grade 7 Algebra',
  manifest: '/manifest.json',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
