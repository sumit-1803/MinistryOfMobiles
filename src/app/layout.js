import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ministry of Mobiles - Second Hand Electronics",
  description: "Best deals on iPhones, iPads, MacBooks, and more in Nevada, Delhi.",
  icons: {
    icon: '/icon.png',
  },
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
