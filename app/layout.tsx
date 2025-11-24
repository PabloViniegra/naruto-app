import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Chivo_Mono, Chivo, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

const chivoMono = Chivo_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-mono",
});

const chivo = Chivo({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naruto-universe.com";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Naruto Universe - Explore the Ninja World",
        template: "%s | Naruto Universe",
    },
    description:
        "Explore the ninja world of Naruto. Discover over 1400 characters, their jutsu, clans, villages, and much more from the Naruto and Boruto universe.",
    keywords: [
        "naruto",
        "naruto shippuden",
        "boruto",
        "anime",
        "characters",
        "jutsu",
        "ninja",
        "konoha",
        "sasuke",
        "sakura",
        "kakashi",
        "akatsuki",
        "uchiha",
        "uzumaki",
    ],
    authors: [{ name: "Naruto Universe Team" }],
    creator: "Naruto Universe",
    publisher: "Naruto Universe",
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
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Naruto Universe",
        title: "Naruto Universe - Explore the Ninja World",
        description:
            "Explore the ninja world of Naruto. Discover over 1400 characters, their jutsu, clans, villages, and much more.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Naruto Universe - Explore the Ninja World",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Naruto Universe - Explore the Ninja World",
        description:
            "Explore the ninja world of Naruto. Discover over 1400 characters, their jutsu, clans, and more.",
        images: ["/og-image.png"],
        creator: "@narutouniverse",
    },
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    category: "entertainment",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Naruto Universe",
    description:
        "Explore the ninja world of Naruto. Discover over 1400 characters, their jutsu, clans, villages, and much more.",
    url: siteUrl,
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/characters?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
    publisher: {
        "@type": "Organization",
        name: "Naruto Universe",
        logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script
                    id="json-ld-website"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${chivoMono.variable} ${chivo.variable} ${inter.variable} antialiased`}
            >
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md"
                >
                    Skip to main content
                </a>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
