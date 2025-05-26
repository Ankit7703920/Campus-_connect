import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster";

// The GeistSans and GeistMono imports from 'geist/font/*'
// are objects that directly provide .variable, not functions to be called.
// So, the following lines were incorrect and are removed:
// const geistSans = GeistSans({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });
// const geistMono = GeistMono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'Connecting students with resources.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        Use GeistSans.variable and GeistMono.variable directly from the imported objects.
        These properties contain the CSS custom property names (e.g., '--font-geist-sans').
      */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
