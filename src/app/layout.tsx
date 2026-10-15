import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import BootScreen from "@/components/fx/BootScreen";
import DepthHud from "@/components/world/DepthHud";
import WorldBackground from "@/components/world/WorldBackground";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Vercel provides the production domain at build time; used for absolute link-preview URLs.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.aspiration}`,
  description: `${profile.role} from ${profile.location} building with Python, RAG and LLMs on the way to becoming an AI Engineer.`,
  openGraph: {
    title: `${profile.name} — ${profile.aspiration}`,
    description: profile.intro,
    images: ["/images/adarsh-portrait.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BootScreen />
        <SmoothScroll />
        <WorldBackground />
        <DepthHud />
        {children}
      </body>
    </html>
  );
}
