import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { getSiteShellData } from "@/sanity/lib/loaders";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/lib/env";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteShell = await getSiteShellData();

  return (
    <>
      <SkipLink />
      <SiteHeader
        siteName={siteShell.siteName}
        navigation={siteShell.navigation}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter
        siteName={siteShell.siteName}
        shortDescription={siteShell.shortDescription}
        instagramUrl={siteShell.instagramUrl}
        pinterestUrl={siteShell.pinterestUrl}
      />
      {isSanityConfigured ? <SanityLive /> : null}
    </>
  );
}
