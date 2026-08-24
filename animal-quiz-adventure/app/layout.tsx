import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({ variable: '--font-fredoka', subsets: ['latin'] });
const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wildly Curious | Animal Quiz',
  description: 'A friendly five-question animal quiz for curious kids ages 8–11.',
  openGraph: {
    title: 'Wildly Curious | Animal Quiz',
    description: 'A friendly five-question animal quiz for curious kids ages 8–11.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Wildly Curious animal quiz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wildly Curious | Animal Quiz',
    description: 'A friendly five-question animal quiz for curious kids ages 8–11.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable}`}>{children}</body>
    </html>
  );
}
