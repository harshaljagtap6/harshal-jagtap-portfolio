import type { Metadata } from "next";
import { Inter, Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RoleProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Harshal Jagtap | Unity Developer & AI Automation Engineer",
  description: "Portfolio of Harshal Jagtap, showcasing dual expertise in Unity/3D Game Development and AI Automation Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${orbitron.variable} ${shareTechMono.variable} antialiased bg-[#0a0a0c] text-foreground min-h-screen flex flex-col font-sans transition-colors duration-500`}
      >
        <RoleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </RoleProvider>
      </body>
    </html>
  );
}

