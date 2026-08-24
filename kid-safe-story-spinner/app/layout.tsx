import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kid-safe-story-spinner.hanlin-6835.chatgpt.site'),
  title: 'Story Spinner — A Tiny Idea Machine',
  description: 'Spin a hero, a place, and a funny problem to start a kid-safe story.',
  openGraph: {
    title: 'Story Spinner!',
    description: 'Three silly ingredients. One brand-new adventure.',
    type: 'website',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Story Spinner — three silly ingredients, one brand-new adventure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story Spinner!',
    description: 'Three silly ingredients. One brand-new adventure.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
