import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, toArray } from "@/lib";
import {
    ArrowLeft,
    Sparkles,
    Users,
    Scroll,
    Swords,
    UsersRound,
    Heart,
    Tv,
    Mic,
} from "lucide-react";
import type { Character } from "@/types";

interface CharacterDetailProps {
    character: Character;
    className?: string;
}

export function CharacterDetail({
    character,
    className,
}: CharacterDetailProps) {
    const imageUrl = character.images?.[0] ?? "";
    const clan = character.personal?.clan ?? null;
    const affiliation = toArray(character.personal?.affiliation);
    const natureTypes = toArray(character.natureType);
    const jutsuList = toArray(character.jutsu);
    const tools = toArray(character.tools);
    const jutsuCount = jutsuList.length;

    const personalInfo = {
        birthdate: character.personal?.birthdate ?? null,
        sex: character.personal?.sex ?? null,
        bloodType: character.personal?.bloodType ?? null,
        classification:
            toArray(character.personal?.classification).join(", ") || null,
        occupation: toArray(character.personal?.occupation).join(", ") || null,
        kekkeiGenkai: toArray(character.personal?.kekkeiGenkai),
        titles: toArray(character.personal?.titles),
        team: toArray(character.personal?.team),
    };

    const ageInfo = character.personal?.age ?? {};
    const heightInfo = character.personal?.height ?? {};
    const weightInfo = character.personal?.weight ?? {};
    const ninjaRank = character.rank?.ninjaRank ?? {};
    const ninjaRegistration = character.rank?.ninjaRegistration ?? null;

    const family = character.family ?? {};
    const familyMembers = Object.entries(family).filter(
        (entry) => entry[1] && entry[1] !== ""
    );

    const debut = character.debut ?? {};
    const debutInfo = Object.entries(debut).filter(
        ([key, value]) => value && value !== "" && key !== "appearsIn"
    );

    const voiceActors = character.voiceActors ?? {};
    const japaneseVA = toArray(voiceActors.japanese);
    const englishVA = toArray(voiceActors.english);

    return (
        <div className={cn("flex flex-col gap-6 sm:gap-8", className)}>
            {/* Back button */}
            <div className="animate-in fade-in duration-300">
                <Button
                    asChild
                    variant="ghost"
                    className="group/back gap-2 transition-all duration-300 hover:gap-3 min-h-[44px]"
                >
                    <Link href="/characters">
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-1" />
                        <span className="text-sm sm:text-base">Back to Characters</span>
                    </Link>
                </Button>
            </div>

            {/* Hero Header - Profile style */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="overflow-hidden">
                    {/* Background gradient */}
                    <div className="relative h-24 bg-linear-to-r from-primary/20 via-primary/10 to-transparent sm:h-32 md:h-40" />

                    {/* Profile content */}
                    <div className="relative px-4 pb-4 sm:px-6 sm:pb-6">
                        {/* Image - overlapping the gradient */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 md:gap-8">
                            <div className="-mt-12 sm:-mt-16 md:-mt-20">
                                <div className="group/image relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 sm:h-32 sm:w-32 md:h-40 md:w-40">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={`${character.name} - Naruto character portrait`}
                                            fill
                                            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                                            className="object-cover object-top transition-transform duration-700 group-hover/image:scale-110"
                                            priority
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Users className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground transition-transform duration-300 group-hover/image:scale-110" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100" />
                                </div>
                            </div>

                            {/* Name and basic info */}
                            <div className="flex flex-1 flex-col gap-2 pb-2 sm:gap-3">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-2xl font-bold tracking-tight leading-tight sm:text-3xl md:text-4xl">
                                        {character.name}
                                    </h1>
                                    {clan && (
                                        <p className="text-base text-muted-foreground sm:text-lg">
                                            {clan} Clan
                                        </p>
                                    )}
                                </div>

                                {/* Affiliations */}
                                {affiliation.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {affiliation.map((village) => (
                                            <span
                                                key={village}
                                                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm text-secondary-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-md cursor-default min-h-[32px]"
                                            >
                                                {village}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick stats */}
                            <div className="flex gap-4 border-t pt-4 sm:gap-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                                {jutsuCount > 0 && (
                                    <div className="group/stat flex flex-col items-center gap-0.5 cursor-default transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                                        <span className="text-xl font-bold transition-all duration-300 group-hover/stat:text-primary group-hover/stat:scale-110 sm:text-2xl">
                                            {jutsuCount}
                                        </span>
                                        <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover/stat:text-foreground">
                                            Jutsu
                                        </span>
                                    </div>
                                )}
                                {natureTypes.length > 0 && (
                                    <div className="group/stat flex flex-col items-center gap-0.5 cursor-default transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                                        <span className="text-xl font-bold transition-all duration-300 group-hover/stat:text-primary group-hover/stat:scale-110 sm:text-2xl">
                                            {natureTypes.length}
                                        </span>
                                        <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover/stat:text-foreground">
                                            Natures
                                        </span>
                                    </div>
                                )}
                                {tools.length > 0 && (
                                    <div className="group/stat flex flex-col items-center gap-0.5 cursor-default transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                                        <span className="text-xl font-bold transition-all duration-300 group-hover/stat:text-primary group-hover/stat:scale-110 sm:text-2xl">
                                            {tools.length}
                                        </span>
                                        <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover/stat:text-foreground">
                                            Tools
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                {/* Personal info card */}
                <Card
                    className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                    style={{
                        animationDelay: "100ms",
                        animationFillMode: "both",
                    }}
                >
                    <CardHeader className="pb-3 px-4 pt-4 sm:pb-4 sm:px-6 sm:pt-6">
                        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
                            {personalInfo.birthdate && (
                                <InfoItem
                                    label="Birthdate"
                                    value={personalInfo.birthdate}
                                />
                            )}
                            {personalInfo.sex && (
                                <InfoItem
                                    label="Sex"
                                    value={personalInfo.sex}
                                />
                            )}
                            {personalInfo.bloodType && (
                                <InfoItem
                                    label="Blood Type"
                                    value={personalInfo.bloodType}
                                />
                            )}
                            {personalInfo.classification && (
                                <InfoItem
                                    label="Classification"
                                    value={personalInfo.classification}
                                />
                            )}
                            {personalInfo.occupation && (
                                <InfoItem
                                    label="Occupation"
                                    value={personalInfo.occupation}
                                />
                            )}
                            {ninjaRegistration && (
                                <InfoItem
                                    label="Ninja Registration"
                                    value={ninjaRegistration}
                                />
                            )}
                            {Object.entries(ageInfo).map(([period, age]) => (
                                <InfoItem
                                    key={period}
                                    label={`Age (${period})`}
                                    value={age}
                                />
                            ))}
                            {Object.entries(heightInfo).map(
                                ([period, height]) => (
                                    <InfoItem
                                        key={period}
                                        label={`Height (${period})`}
                                        value={height}
                                    />
                                )
                            )}
                            {Object.entries(weightInfo).map(
                                ([period, weight]) => (
                                    <InfoItem
                                        key={period}
                                        label={`Weight (${period})`}
                                        value={weight}
                                    />
                                )
                            )}
                            {Object.entries(ninjaRank).map(([period, rank]) => (
                                <InfoItem
                                    key={period}
                                    label={`Rank (${period})`}
                                    value={rank}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Nature types */}
                {natureTypes.length > 0 && (
                    <Card
                        className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        style={{
                            animationDelay: "150ms",
                            animationFillMode: "both",
                        }}
                    >
                        <CardHeader className="pb-3 px-4 pt-4 sm:pb-4 sm:px-6 sm:pt-6">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-12" />
                                Nature Types
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {natureTypes.map((nature, index) => (
                                    <span
                                        key={nature}
                                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:px-4 sm:text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground animate-in fade-in slide-in-from-bottom-2 min-h-[32px]"
                                        style={{
                                            animationDelay: `${
                                                200 + index * 50
                                            }ms`,
                                            animationFillMode: "both",
                                        }}
                                    >
                                        {nature}
                                    </span>
                                ))}
                            </div>

                            {/* Kekkei Genkai */}
                            {personalInfo.kekkeiGenkai.length > 0 && (
                                <div className="mt-6 border-t pt-4">
                                    <span className="mb-3 block text-sm font-medium text-muted-foreground">
                                        Kekkei Genkai
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {personalInfo.kekkeiGenkai.map((kg) => (
                                            <span
                                                key={kg}
                                                className="inline-flex items-center rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground hover:scale-105 hover:shadow-md hover:shadow-destructive/20 cursor-default"
                                            >
                                                {kg}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Family section */}
                {familyMembers.length > 0 && (
                    <Card
                        className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        style={{
                            animationDelay: "200ms",
                            animationFillMode: "both",
                        }}
                    >
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5 transition-transform duration-300 group-hover/card:scale-125 group-hover/card:text-red-500" />
                                Family
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {familyMembers.map(([relation, name]) => (
                                    <InfoItem
                                        key={relation}
                                        label={capitalizeFirst(relation)}
                                        value={name}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Teams section */}
                {personalInfo.team.length > 0 && (
                    <Card
                        className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        style={{
                            animationDelay: "250ms",
                            animationFillMode: "both",
                        }}
                    >
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <UsersRound className="h-5 w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6" />
                                Teams
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {personalInfo.team.map((team) => (
                                    <span
                                        key={team}
                                        className="inline-flex items-center rounded-full border bg-card px-4 py-1.5 text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:shadow-md cursor-default"
                                    >
                                        {team}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Jutsu section - full width */}
            {jutsuList.length > 0 && (
                <Card
                    className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                    style={{
                        animationDelay: "300ms",
                        animationFillMode: "both",
                    }}
                >
                    <CardHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                            <Scroll className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6" />
                            Jutsu & Techniques
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            {jutsuCount} technique{jutsuCount !== 1 ? "s" : ""}{" "}
                            known
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {jutsuList.map((jutsu, index) => (
                                <div
                                    key={jutsu}
                                    className="group/jutsu flex items-center rounded-md border bg-card px-3 py-2.5 text-xs sm:px-4 sm:text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 cursor-default animate-in fade-in slide-in-from-bottom-2 min-h-[40px]"
                                    style={{
                                        animationDelay: `${
                                            350 + Math.min(index, 20) * 20
                                        }ms`,
                                        animationFillMode: "both",
                                    }}
                                >
                                    <span className="transition-transform duration-300 group-hover/jutsu:translate-x-1 break-words">
                                        {jutsu}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tools section */}
            {tools.length > 0 && (
                <Card
                    className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                    style={{
                        animationDelay: "350ms",
                        animationFillMode: "both",
                    }}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Swords className="h-5 w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-12" />
                            Tools & Equipment
                        </CardTitle>
                        <CardDescription>
                            {tools.length} tool{tools.length !== 1 ? "s" : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="inline-flex items-center rounded-md border bg-secondary px-3 py-1.5 text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 hover:-translate-y-0.5 hover:shadow-md cursor-default"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Bottom grid for debut and voice actors */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Debut section */}
                {debutInfo.length > 0 && (
                    <Card
                        className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        style={{
                            animationDelay: "400ms",
                            animationFillMode: "both",
                        }}
                    >
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Tv className="h-5 w-5 transition-transform duration-300 group-hover/card:scale-110" />
                                Debut Appearances
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {debutInfo.map(([medium, episode]) => (
                                    <InfoItem
                                        key={medium}
                                        label={capitalizeFirst(medium)}
                                        value={episode}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Voice Actors section */}
                {(japaneseVA.length > 0 || englishVA.length > 0) && (
                    <Card
                        className="group/card animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                        style={{
                            animationDelay: "450ms",
                            animationFillMode: "both",
                        }}
                    >
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Mic className="h-5 w-5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-translate-y-0.5" />
                                Voice Actors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {japaneseVA.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Japanese
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {japaneseVA.map((va) => (
                                                <span
                                                    key={va}
                                                    className="inline-flex items-center rounded-md border bg-card px-3 py-1 text-sm transition-all duration-300 hover:bg-accent hover:border-accent hover:scale-105 hover:shadow-sm cursor-default"
                                                >
                                                    {va}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {englishVA.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            English
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {englishVA.map((va) => (
                                                <span
                                                    key={va}
                                                    className="inline-flex items-center rounded-md border bg-card px-3 py-1 text-sm transition-all duration-300 hover:bg-accent hover:border-accent hover:scale-105 hover:shadow-sm cursor-default"
                                                >
                                                    {va}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="group/info flex flex-col gap-0.5 rounded-lg p-2 -m-2 transition-all duration-300 hover:bg-accent/50 cursor-default min-h-[52px]">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover/info:text-primary leading-tight">
                {label}
            </span>
            <span className="text-sm transition-transform duration-300 group-hover/info:translate-x-1 break-words">
                {value}
            </span>
        </div>
    );
}

function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
