import './globals.css';
import { Navbar } from './ui/components/navbar';
import { lato } from './ui/fonts';

import { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    default: 'Reviews App',
    template: '%s | Reviews App',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lato.variable}>
      <body className={`${lato.className} flex flex-col min-h-screen px-8 py-4 `}>
        <Toaster position="top-center" />

        <header>
          <Navbar />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="border-t py-2 text-xs text-center">footer</footer>
      </body>
    </html>
  );
}
