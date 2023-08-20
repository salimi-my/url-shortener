import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Shortener — Custom Short Link & Analytics',
  description:
    'URL Shortener is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
