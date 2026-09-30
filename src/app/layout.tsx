import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import FloatingSocialButtons from "@/components/FloatingSocialButtons";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoreX Arena & Academy",
  description: "CoreX Arena & Academy — Play. Train. Compete.",
  icons: {
    icon: "/corex-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable}`}>
        <Navbar />
        {children}
        <FloatingSocialButtons />
        <Footer />
      </body>
    </html>
  );
}
