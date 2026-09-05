import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "VantaClip // Kinetic 3D Media Architecture",
  description:
    "Persistent 3D optical glass matrix engineered for short-form media and viral content omnipresence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full antialiased font-sans", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-[#050508] text-[#f4f4f6]">
        {children}
      </body>
    </html>
  );
}
