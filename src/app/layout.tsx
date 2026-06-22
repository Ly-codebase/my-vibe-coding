import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import BackgroundEffectsLoader from "@/components/BackgroundEffectsLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "The Works of Louie Lu",
  description: "Vibe Coding 作品集 — 用代码表达直觉，用作品传递氛围",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <BackgroundEffectsLoader />
        {children}
      </body>
    </html>
  );
}
