import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Color Mood Lab',
  description: 'A tiny interactive study in the feeling of color.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
