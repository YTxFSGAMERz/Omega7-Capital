import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Omega7 Capital — Venture Capital Firm India | Startup Funding & Seed Investment",
    template: "%s — Omega7 Capital",
  },
  description:
    "Omega7 Capital is an India-based venture capital firm investing in early-stage startups. We provide seed funding, strategic mentorship, and growth capital to visionary founders building the future.",
  keywords: [
    "venture capital firm India",
    "startup funding India",
    "seed funding investors",
    "angel investors India",
    "early stage investment",
    "startup investment India",
    "Omega7 Capital",
    "quantitative finance",
    "venture capital",
    "seed funding",
  ],
  authors: [{ name: "Omega7 Capital" }],
  creator: "Omega7 Capital",
  publisher: "Omega7 Capital",
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
  metadataBase: new URL("https://omega7capital.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omega7capital.org",
    siteName: "Omega7 Capital",
    title: "Omega7 Capital — Venture Capital Firm India",
    description:
      "India-based venture capital firm providing seed funding, strategic mentorship, and growth capital to visionary founders.",
    images: [
      {
        url: "/omega7-logo.webp",
        width: 483,
        height: 483,
        alt: "Omega7 Capital — Venture Capital Firm India",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Omega7 Capital — Venture Capital Firm India",
    description:
      "India-based venture capital firm providing seed funding and growth capital to visionary founders.",
    images: ["/omega7-logo.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization + WebSite Schema (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Omega7 Capital",
    alternateName: "Omega7",
    url: "https://omega7capital.org",
    logo: "https://omega7capital.org/omega7-logo.webp",
    description:
      "India-based venture capital firm investing in early-stage startups with seed funding, strategic mentorship, and growth capital.",
    foundingDate: "2024",
    industry: "Financial Services",
    serviceType: [
      "Venture Capital",
      "Seed Funding",
      "Startup Investment",
      "Growth Capital",
      "Strategic Mentorship",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "General Inquiry",
      email: "adanegarab@gmail.com",
      url: "https://omega7capital.org",
      availableLanguage: ["English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Omega7 Capital",
    url: "https://omega7capital.org",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://omega7capital.org/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://omega7capital.org",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Omega7 Capital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Omega7 Capital is an international quantitative finance research collective that brings together exceptional students from universities across Europe, Africa, Asia, and beyond. We are united by a shared commitment to advancing knowledge in quantitative and mathematical finance through rigorous scientific inquiry.",
        },
      },
      {
        "@type": "Question",
        name: "Who can apply for membership?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We welcome applications from students who demonstrate strong technical ability in mathematics, statistics, or related quantitative disciplines. Candidates are selected on the basis of demonstrated technical competence, intellectual curiosity, and a genuine willingness to contribute to the collective's research mission.",
        },
      },
      {
        "@type": "Question",
        name: "What does membership involve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Members participate in regular seminars, reading groups, and collaborative working sessions that form the backbone of our intellectual life. We study foundational texts of quantitative finance, engage with current literature, and translate theory into practice through rigorous, well-documented research projects.",
        },
      },
      {
        "@type": "Question",
        name: "How is Omega7 Capital different from other VC firms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike traditional venture capital firms, Omega7 Capital is fundamentally a research collective with deep roots in academic rigor and quantitative methodology. Our primary focus is on producing high-quality research that meets the standards of the broader academic and scientific community, rather than on commercial deal-making.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={crimsonPro.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://omega7capital.org/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-crimson-pro), Georgia, serif',
                fontSize: '14px',
                fontWeight: 300,
                background: 'var(--bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              },
            }}
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
