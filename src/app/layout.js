import { Inter, Roboto_Mono } from "next/font/google";
import Header from '../components/header';
import Footer from '../components/Footer';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${roboto_mono.className} antialiased`}>
          <main className="flex flex-col min-h-screen">
          <Suspense fallback={<div className="p-3">Loading header...</div>}>
            <Header />
          </Suspense>
          <div className="flex-grow">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
              <div className="text-xl">Loading content...</div>
            </div>}>
              {children}
            </Suspense>
          </div>
          <Suspense fallback={<div className="p-3">Loading footer...</div>}>
            <Footer />
          </Suspense>

          </main>
        </body>
      </html>
    </ClerkProvider>





  );
}
