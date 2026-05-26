import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AdminModeProvider } from "@/lib/admin/AdminModeContext";
import { AdminBar } from "@/components/admin/AdminBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isAdminAuthenticated } from "@/lib/admin/session";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seijas.dev"),
  title: {
    default: "Seijas Digital Services — Senior Software Engineer & Product Architect",
    template: "%s | Seijas Digital Services",
  },
  description:
    "Senior software engineer with 10+ years specializing in iOS architecture, AI-powered development, and scalable product systems. Building intelligent digital products for startups and modern businesses.",
  keywords: [
    "iOS development",
    "Swift",
    "SwiftUI",
    "AI integration",
    "mobile app development",
    "product architecture",
    "software consulting",
    "startup engineering",
    "scalable apps",
    "Next.js",
    "full-stack development",
  ],
  authors: [{ name: "Yen Seijas", url: "https://seijas.dev" }],
  creator: "Yen Seijas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seijas.dev",
    title: "Seijas Digital Services — Senior Software Engineer & Product Architect",
    description:
      "Senior software engineer with 10+ years specializing in iOS architecture, AI-powered development, and scalable product systems.",
    siteName: "Seijas Digital Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seijas Digital Services — Senior Software Engineer",
    description:
      "Senior software engineer with 10+ years specializing in iOS architecture, AI-powered development, and scalable product systems.",
    creator: "@seijasdev",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await isAdminAuthenticated();

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        <AdminBar isAdmin={isAdmin} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AdminModeProvider isAdmin={isAdmin}>
              {isAdmin && <div className="h-10" />}
              <Header />
              <main className="relative">{children}</main>
              <Footer />
            </AdminModeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
