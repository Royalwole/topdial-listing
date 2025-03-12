import { Inter, Roboto_Mono } from "next/font/google";
import Header from '../components/header';
import Footer from '../components/Footer';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

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
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
