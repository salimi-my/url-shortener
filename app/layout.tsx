import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Shortener',
  description:
    'URL Shortener is a tool for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-zinc-900 hover:bg-zinc-900/90 active:bg-zinc-900/90 focus:shadow-none',
          footerActionLink:
            'text-zinc-900 hover:text-zinc-900/90 active:text-zinc-900/90 focus:shadow-none',
          socialButtonsBlockButton: 'focus:shadow-none',
          formFieldInput:
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          formFieldInputShowPasswordButton: 'focus:shadow-none'
        }
      }}
    >
      <html lang='en' className=''>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
