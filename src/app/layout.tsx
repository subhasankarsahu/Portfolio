import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CommandPalette from "@/components/CommandPalette";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const almarai = Almarai({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://subha-sankar-sahu.vercel.app"),
  title: "Subha Sankar Sahu | Full-Stack Developer",
  description: "Full-stack developer focused on PERN applications, strong C++ and DSA fundamentals, and AI-powered web products.",
  keywords: [
    "Subha Sankar Sahu",
    "Full-Stack Developer",
    "PERN Stack",
    "React.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "C++",
    "Data Structures and Algorithms",
    "AI-powered web products"
  ],
  authors: [{ name: "Subha Sankar Sahu" }],
  creator: "Subha Sankar Sahu",
  publisher: "Subha Sankar Sahu",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/subha-sankar-sahu-portrait.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subha-sankar-sahu.vercel.app",
    title: "Subha Sankar Sahu | Full-Stack Developer",
    description: "Full-stack developer focused on PERN applications, strong C++ and DSA fundamentals, and AI-powered web products.",
    siteName: "Subha Sankar Sahu Portfolio",
    images: [
      {
        url: "/subha-sankar-sahu-portrait.jpeg",
        width: 800,
        height: 800,
        alt: "Portrait of Subha Sankar Sahu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subha Sankar Sahu | Full-Stack Developer",
    description: "Full-stack developer focused on PERN applications, strong C++ and DSA fundamentals, and AI-powered web products.",
    images: ["/subha-sankar-sahu-portrait.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Subha Sankar Sahu",
    "alternateName": ["Subha Sankar Sahu", "subhasankarsahu"],
    "description": "Full-stack developer focused on PERN applications, strong C++ and DSA fundamentals, and AI-powered web products.",
    "url": "https://subha-sankar-sahu.vercel.app",
    "image": "https://subha-sankar-sahu.vercel.app/subha-sankar-sahu-portrait.jpeg",
    "email": "subhasankarsahu5@gmail.com",
    "jobTitle": "Full-Stack Developer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rourkela",
      "addressCountry": "IN"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Biju Patnaik University of Technology, Rourkela"
    },
    "sameAs": [
      "https://github.com/subhasankarsahu",
      "https://instagram.com/shadow____.18",
      "https://x.com/shadow___18"
    ],
    "knowsAbout": [
      "Generative AI",
      "Coding Agents",
      "Machine Learning",
      "Natural Language Processing",
      "System Architecture",
      "TypeScript",
      "Next.js",
      "React",
      "Python"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Subha Sankar Sahu | Full-Stack Developer",
    "alternateName": "Subha Sankar Sahu Portfolio",
    "url": "https://subha-sankar-sahu.vercel.app",
    "description": "Portfolio of Subha Sankar Sahu, a full-stack developer focused on PERN applications and AI-powered web products.",
    "author": {
      "@type": "Person",
      "name": "Subha Sankar Sahu"
    }
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Subha Sankar Sahu — Developer Profile",
    "url": "https://subha-sankar-sahu.vercel.app",
    "mainEntity": personJsonLd
  };

  return (
    <html lang="en" className={`${almarai.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://subha-sankar-sahu.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVKZDX9D');`}
        </Script>
      </head>
      <body className="antialiased font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVKZDX9D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LenisProvider>
          <CommandPalette />
          {children}
        </LenisProvider>
        <SpeedInsights />
        <Analytics />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HC19S895RB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HC19S895RB');
          `}
        </Script>
      </body>
    </html>
  );
}
