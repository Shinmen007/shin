import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { PageLayout } from "@/components/page-layout";
import "@/lib/suppress-hydration-warnings";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://roshankhatri.dev"),
  title: {
    default: "Roshan Khatri - Full-Stack Developer",
    template: "%s | Roshan Khatri",
  },
  description:
    "Roshan Khatri - Full-stack developer specializing in modern web technologies, 3D experiences, and performance-driven applications.",
  keywords: [
    "Roshan Khatri",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Roshan Khatri" }],
  creator: "Roshan Khatri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Roshan Khatri - Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web technologies, 3D experiences, and performance-driven applications.",
    siteName: "Roshan Khatri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Khatri - Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web technologies, 3D experiences, and performance-driven applications.",
    creator: "@roshankhatri", // TODO: Replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <Providers>
          <PageLayout>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
