import type { Metadata } from "next";
import { Fraunces, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Build with Kartik — Full Stack Developer & AI Builder",
  description:
    "Indie developer building full stack web apps, AI agents, and digital products that help businesses grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${dmMono.variable} ${outfit.variable} antialiased bg-[#080808] text-[#f5f1e8]`}
      >
        <div className="grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <PageLoader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
