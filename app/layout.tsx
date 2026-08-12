import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://identix-sketch.app"),
  title: {
    default: "Identix Sketch | Forensic Facial Intelligence & Composite Studio",
    template: "%s | Identix Sketch",
  },
  description:
    "Advanced forensic facial composite workstation for intelligence agencies, law enforcement, and forensic sketch artists. Construct suspect sketches with real-time age progression, vector part selection, and official dossier export.",
  applicationName: "Identix Facial Composite Studio",
  authors: [{ name: "Identix Intelligence Systems" }],
  generator: "Next.js",
  keywords: [
    "forensic sketch",
    "facial composite software",
    "suspect sketch builder",
    "police sketch tool",
    "face reconstruction engine",
    "eyewitness facial identification",
    "forensic face builder",
    "facial intelligence workstation",
    "identi-kit digital composite",
    "suspect composite dossier",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Identix Forensic Systems",
  publisher: "Identix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://identix-sketch.app",
    siteName: "Identix Facial Composite Studio",
    title: "Identix Sketch | Forensic Facial Intelligence & Composite Studio",
    description:
      "Construct precision forensic face composites based on suspect age, gender, ethnicity, and witness testimony with real-time vector editing and dossier export.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Identix Sketch Forensic Face Builder Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Identix Sketch | Forensic Facial Intelligence Studio",
    description:
      "Precision forensic face sketch builder for intelligence & law enforcement.",
    creator: "@IdentixSystems",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
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
    "name": "Identix Sketch Studio",
    "operatingSystem": "Web Browser",
    "applicationCategory": "DesignApplication",
    "description":
      "Forensic facial composite composition software for intelligence agencies, law enforcement, and forensic sketch artists.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "author": {
      "@type": "Organization",
      "name": "Identix Forensic Systems",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
