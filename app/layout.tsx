import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Open-Source Leg",
  description: "An end-to-end open-source platform that makes prosthetics research more accessible",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased pt-20`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
