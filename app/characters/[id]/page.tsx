import type { Metadata } from "next";
import { MainContainer } from "@/core";
import { ServerCharacterDetail } from "@/features/characters/server/server-character-detail";
import { fetchData } from "@/lib/api";
import type { Character } from "@/types";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const character = await fetchData<Character>(`/characters/${id}`, {
      revalidate: 3600,
    });

    const clan = character.personal?.clan ?? "Unknown Clan";
    const affiliation = character.personal?.affiliation?.[0] ?? "Unknown Village";
    const description = `Learn about ${character.name} from the ${clan} clan. ${
      character.jutsu?.length
        ? `Master of ${character.jutsu.length} jutsu techniques.`
        : ""
    } Affiliated with ${affiliation}.`;

    return {
      title: `${character.name} | Naruto Characters`,
      description,
      openGraph: {
        title: `${character.name} - Naruto Character Profile`,
        description,
        images: character.images?.[0]
          ? [
              {
                url: character.images[0],
                width: 400,
                height: 533,
                alt: `${character.name} portrait`,
              },
            ]
          : [],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${character.name} | Naruto Characters`,
        description,
        images: character.images?.[0] ? [character.images[0]] : [],
      },
    };
  } catch {
    return {
      title: "Character Not Found | Naruto Characters",
      description: "The requested character could not be found.",
    };
  }
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  return (
    <MainContainer>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <ServerCharacterDetail id={id} />
      </div>
    </MainContainer>
  );
}
