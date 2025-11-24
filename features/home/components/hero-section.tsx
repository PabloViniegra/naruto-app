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
        <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center overflow-hidden isolate">
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
            <div className="relative z-20 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-sans text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Naruto Universe
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl font-serif">
                    Explore the ninja world. Discover all characters, their
                    jutsu, clans, and much more from the Naruto universe.
                </p>
            </div>

            <div className="relative z-20 flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <Button
                    asChild
                    size="lg"
                    className="font-mono rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
                >
                    <Link href="/characters">Explore Universe</Link>
                </Button>
            </div>

            <div className="relative z-20 mt-8 grid grid-cols-3 gap-8 text-center sm:gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="group flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1">
                    <span className="font-mono text-3xl font-bold sm:text-4xl transition-colors duration-300 group-hover:text-primary">
                        1400+
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Characters
                    </span>
                </div>
                <div className="group flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1">
                    <span className="font-mono text-3xl font-bold sm:text-4xl transition-colors duration-300 group-hover:text-primary">
                        500+
                    </span>
                    <span className="text-sm text-muted-foreground">Jutsu</span>
                </div>
                <div className="group flex flex-col gap-1 transition-transform duration-300 hover:-translate-y-1">
                    <span className="font-mono text-3xl font-bold sm:text-4xl transition-colors duration-300 group-hover:text-primary">
                        50+
                    </span>
                    <span className="text-sm text-muted-foreground">Clans</span>
                </div>
            </div>
        </section>
    );
}
