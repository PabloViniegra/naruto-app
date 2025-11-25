"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Ribbons = dynamic(() => import("@/components/Ribbons"), {
    ssr: false,
});

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center overflow-hidden isolate sm:gap-8">
            {/* Ribbons Background Effect */}
            <div className="absolute inset-0 z-[15] opacity-50">
                <Ribbons
                    colors={[
                        "#8a8a8a",
                        "#6b6b6b",
                        "#9c9c9c",
                        "#ff6b35",
                    ]}
                    baseSpring={0.02}
                    baseFriction={0.92}
                    baseThickness={20}
                    offsetFactor={0.04}
                    maxAge={600}
                    pointCount={60}
                    speedMultiplier={0.4}
                    enableFade={true}
                    backgroundColor={[0, 0, 0, 0]}
                />
            </div>

            {/* Background Image */}
            <Image
                src="/bg.webp"
                alt="Panoramic view of Konoha Village, the Hidden Leaf Village from Naruto anime"
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AzLT9P1C5p0d2GrI9aRmRJFI2YqSDz6yFNp16OZ4pKkqyIxVlKkEEHYjIxgJG8bMcT/9k="
                sizes="100vw"
                quality={90}
                className="object-cover object-center z-0"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-background/80 via-background/70 to-background" />
            <div className="relative z-20 flex flex-col gap-3 px-2 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:gap-4">
                <h1 className="font-sans text-3xl font-bold tracking-tight leading-tight sm:text-5xl md:text-6xl">
                    Naruto Universe
                </h1>
                <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg md:text-xl font-serif px-2">
                    Explore the ninja world. Discover all characters, their
                    jutsu, clans, and much more from the Naruto universe.
                </p>
            </div>

            <div className="relative z-20 flex flex-col gap-3 w-full px-2 sm:flex-row sm:w-auto sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <Button
                    asChild
                    size="lg"
                    className="font-mono rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 w-full sm:w-auto min-h-[48px]"
                >
                    <Link href="/characters">Explore Universe</Link>
                </Button>
            </div>

            <div className="relative z-20 mt-4 grid grid-cols-3 gap-4 text-center w-full max-w-md sm:mt-8 sm:gap-8 sm:max-w-2xl md:gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-2">
                <div className="group flex flex-col gap-0.5 transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                    <span className="font-mono text-2xl font-bold sm:text-3xl md:text-4xl transition-colors duration-300 group-hover:text-primary">
                        1400+
                    </span>
                    <span className="text-xs text-muted-foreground sm:text-sm">
                        Characters
                    </span>
                </div>
                <div className="group flex flex-col gap-0.5 transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                    <span className="font-mono text-2xl font-bold sm:text-3xl md:text-4xl transition-colors duration-300 group-hover:text-primary">
                        500+
                    </span>
                    <span className="text-xs text-muted-foreground sm:text-sm">Jutsu</span>
                </div>
                <div className="group flex flex-col gap-0.5 transition-transform duration-300 hover:-translate-y-1 sm:gap-1">
                    <span className="font-mono text-2xl font-bold sm:text-3xl md:text-4xl transition-colors duration-300 group-hover:text-primary">
                        50+
                    </span>
                    <span className="text-xs text-muted-foreground sm:text-sm">Clans</span>
                </div>
            </div>
        </section>
    );
}
