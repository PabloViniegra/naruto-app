/**
 * Hero section for the About page featuring the main heading and description
 */
export function HeroSection() {
    return (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl font-bold tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    About Naruto Universe
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed sm:text-lg md:text-xl max-w-3xl font-serif">
                    Dive into the vast and intricate world of Naruto. Our platform
                    provides comprehensive information about characters, clans,
                    villages, and the incredible jutsu that define the ninja world.
                </p>
            </div>
        </section>
    );
}
