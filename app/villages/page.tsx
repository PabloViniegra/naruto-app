import type { Metadata } from "next";
import { MainContainer } from "@/core";
import { ServerVillages } from "@/features/villages";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const isFirstPage = currentPage === 1;

  return {
    title: isFirstPage ? "Villages" : `Villages - Page ${currentPage}`,
    description:
      "Explore the hidden villages of the Naruto universe. Discover Konohagakure, Sunagakure, Kirigakure, and many more ninja villages.",
    openGraph: {
      title: "Naruto Villages - Complete Database",
      description:
        "Explore the hidden villages of the Naruto universe. Discover Konohagakure, Sunagakure, Kirigakure, and many more ninja villages.",
      url: "/villages",
      images: [
        {
          url: "/og-villages.png",
          width: 1200,
          height: 630,
          alt: "Naruto Villages Database",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Naruto Villages - Complete Database",
      description:
        "Explore the hidden villages of the Naruto universe. Discover Konohagakure, Sunagakure, Kirigakure, and many more ninja villages.",
      images: ["/og-villages.png"],
    },
    robots: isFirstPage
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: "/villages",
    },
  };
}

interface VillagesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VillagesPage({ searchParams }: VillagesPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  return (
    <MainContainer>
      <div className="flex flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-sans text-3xl font-bold tracking-tight sm:text-4xl">
            Naruto Villages
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Explore the hidden villages of the Naruto universe. Each village has
            its own unique culture, traditions, and powerful shinobi that defend
            their homeland.
          </p>
        </div>

        <ServerVillages page={currentPage} />
      </div>
    </MainContainer>
  );
}
