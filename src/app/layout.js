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
  title: "Topdial Services",
  description: "Topdial.ng",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <main className="flex flex-col min-h-screen">
            <Suspense
              fallback={
                <div className="bg-slate-200 h-16 flex items-center justify-center">
                </div>
              }
            >
              {/* Ensure Header component includes sticky top-0 z-50 */}
              <Header />
            </Suspense>
            <div className="flex-grow">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center flex-grow">
                    Hold on, this might take a while...
                  </div>
                }
              >
                {children}
              </Suspense>
            </div>
            <Suspense
              fallback={
                <div className="bg-gray-800 h-16 flex items-center justify-center text-white">
                  Hold on, there are a few things loading...
                </div>
              }
            >
              <Footer />
            </Suspense>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}