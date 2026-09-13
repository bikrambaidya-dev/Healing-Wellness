import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SITE } from "@/lib/site";
import { AppStoreProvider } from "@/lib/store";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | Healing Experts, Meditation & Crystals`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "healing experts",
    "reiki healing",
    "meditation booking",
    "crystal shop",
    "energy healing",
    "chakra balancing",
    "wellness marketplace",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.fullName,
    title: `${SITE.fullName} | Healing Experts, Meditation & Crystals`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} | Healing Experts, Meditation & Crystals`,
    description: SITE.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-plum">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.fullName,
              url: SITE.url,
              description: SITE.description,
              sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube],
            }),
          }}
        />
        <AppStoreProvider>
          <SiteChrome>{children}</SiteChrome>
        </AppStoreProvider>
      </body>
    </html>
  );
}
