import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { SerwistProvider } from "@serwist/next/react";
import "./globals.css";
import Modal from "@/components/features/Modal";

const APP_NAME = "Jonel Hatwell";
const APP_DEFAULT_TITLE = "Jonel Hatwell";
const APP_DESCRIPTION = "Jonel Hatwell's personal portfolio — developer, designer, creator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: "%s — Jonel Hatwell",
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  icons: {
    icon: "/site-logo.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${sourceSerif.variable} antialiased`}
      >
        <SerwistProvider swUrl="/sw.js">
          <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
            <div className="mx-auto max-w-7xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
              <div className="lg:flex lg:justify-between lg:gap-4">
                {children}
              </div>
            </div>
          </div>

          <Modal />
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
