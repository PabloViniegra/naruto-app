import type { Metadata } from "next";
import { Suspense } from "react";
import { MainContainer } from "@/core";
import { ServerCharacters, CharactersSearch } from "@/features/characters";
import { MAX_PAGE_NUMBER } from "@/config";

type Props = {
    searchParams: Promise<{ q?: string; page?: string }>;
};

/**
 * Validates and normalizes the page parameter.
 * @param page - The page string from search params.
 * @returns A valid page number between 1 and MAX_PAGE_NUMBER.
 */
function validatePage(page: string | undefined): number {
    if (!page) return 1;

    const parsed = parseInt(page, 10);

    // Handle NaN, negative numbers, and zero
    if (isNaN(parsed) || parsed < 1) return 1;

    // Limit to maximum page number for security
    if (parsed > MAX_PAGE_NUMBER) return MAX_PAGE_NUMBER;

    return parsed;
}

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const { q, page } = await searchParams;
    const currentPage = validatePage(page);
    const hasFilters = q || currentPage > 1;

    return {
        title: q ? `Search: ${q}` : "Characters",
        description: q
            ? `Search results for "${q}" in Naruto characters database. Find information about jutsu, clans, villages, and abilities.`
            : "Browse and search through over 1400 characters from the Naruto universe. Find information about their jutsu, clans, villages, and abilities.",
        openGraph: {
            title: q
                ? `Search: ${q} - Naruto Characters`
                : "Naruto Characters - Complete Database",
            description: q
                ? `Search results for "${q}" in Naruto characters database.`
                : "Browse and search through over 1400 characters from the Naruto universe.",
            url: "/characters",
            images: [
                {
                    url: "/og-characters.png",
                    width: 1200,
                    height: 630,
                    alt: "Naruto Characters Database",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: q
                ? `Search: ${q} - Naruto Characters`
                : "Naruto Characters - Complete Database",
            description: q
                ? `Search results for "${q}" in Naruto characters database.`
                : "Browse and search through over 1400 characters from the Naruto universe.",
            images: ["/og-characters.png"],
        },
        robots: hasFilters
            ? { index: false, follow: true }
            : { index: true, follow: true },
        alternates: {
            canonical: "/characters",
        },
    };
}

interface CharactersPageProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function CharactersPage({
    searchParams,
}: CharactersPageProps) {
    const { q, page } = await searchParams;
    const currentPage = validatePage(page);

    return (
        <MainContainer>
            <div className="flex flex-col gap-8 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-sans text-3xl font-bold">
                            Naruto Characters
                        </h1>
                        <p className="text-muted-foreground">
                            Browse over 1400 characters from the Naruto and
                            Boruto universe
                        </p>
                    </div>
                    <Suspense
                        fallback={
                            <div className="h-9 w-full max-w-xs animate-pulse rounded-md bg-muted" />
                        }
                    >
                        <CharactersSearch />
                    </Suspense>
                </div>

                <ServerCharacters searchQuery={q} page={currentPage} />
            </div>
        </MainContainer>
    );
}
