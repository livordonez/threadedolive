import type { Metadata } from "next";
import { EB_Garamond, Meow_Script, Silkscreen } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { rootMetadata, rootViewport } from "@/lib/site";
import { getNavigation, getSettings } from "@/lib/cms-data";
import "./globals.css";

const editorialFont = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const stitchFont = Silkscreen({
  variable: "--font-stitch",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const journalHandFont = Meow_Script({
  variable: "--font-journal-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata;
export const viewport = rootViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation] = await Promise.all([getSettings(), getNavigation()]);
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${editorialFont.variable} ${stitchFont.variable} ${journalHandFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-charcoal-900">
        <SkipLink />
        <SiteHeader settings={settings} navigation={navigation} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
