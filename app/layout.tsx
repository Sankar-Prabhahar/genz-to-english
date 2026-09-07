import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenZ Translator – Translate Internet Slang Instantly",
  description:
    "Free AI-powered Gen Z slang translator that runs entirely in your browser using WebGPU. 100% private, zero server inference, offline capable.",
  keywords: [
    "Gen Z translator",
    "slang translator",
    "WebGPU AI",
    "browser LLM",
    "Transformers.js",
    "slang dictionary",
    "privacy-first translation",
  ],
  authors: [{ name: "Sankar Narayanan" }],
  creator: "Sankar Narayanan",
  openGraph: {
    title: "GenZ Translator – Translate Internet Slang Instantly",
    description:
      "Free AI-powered Gen Z slang translator that runs entirely in your browser using WebGPU. No servers. Zero tracking.",
    type: "website",
    locale: "en_US",
    siteName: "GenZ Translator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenZ Translator – Translate Internet Slang Instantly",
    description: "In-browser WebGPU Gen Z Slang AI Translator. 100% private, zero servers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GenZ Translator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser (Chrome, Edge, Brave, Safari, Firefox)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free AI-powered Gen Z slang translator that runs entirely in your browser using WebGPU.",
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-purple-600 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
