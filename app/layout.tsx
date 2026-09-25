import { Header } from '@/components/shared/Header';
import { cn } from '@/lib/utils';
import QueryProvider from '@/providers/QueryClient';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Arngren Store',
  description: 'Modern product menu for Arngren Store',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}>
      <body className="min-h-full  flex flex-col">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
        <Toaster
          position="top-center"
          toastOptions={{ style: { maxWidth: 'calc(100vw - 2rem)' } }}
        />
      </body>
    </html>
  );
}
