import type { Metadata } from "next";
import { MainContainer } from "@/core";
import { ServerClans } from "@/features/clans";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const isFirstPage = currentPage === 1;

  return {
    title: isFirstPage ? "Clans" : `Clans - Page ${currentPage}`,
    description:
      "Explore the legendary clans of the Naruto universe. Discover the Uchiha, Hyuga, Uzumaki, and many more powerful ninja families.",
    openGraph: {
      title: "Naruto Clans - Complete Database",
      description:
        "Explore the legendary clans of the Naruto universe. Discover the Uchiha, Hyuga, Uzumaki, and many more powerful ninja families.",
      url: "/clans",
      images: [
        {
          url: "/og-clans.png",
          width: 1200,
          height: 630,
          alt: "Naruto Clans Database",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Naruto Clans - Complete Database",
      description:
        "Explore the legendary clans of the Naruto universe. Discover the Uchiha, Hyuga, Uzumaki, and many more powerful ninja families.",
      images: ["/og-clans.png"],
    },
    robots: isFirstPage
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: "/clans",
    },
  };
}

interface ClansPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ClansPage({ searchParams }: ClansPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  return (
    <MainContainer>
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl">
            Naruto Clans
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Explore the legendary clans of the Naruto universe. Each clan
            possesses unique abilities, kekkei genkai, and rich histories that
            shape the ninja world.
          </p>
        </div>

        <ServerClans page={currentPage} />
      </div>
    </MainContainer>
  );
}
