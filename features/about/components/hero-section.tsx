/**
 * Hero section for the About page featuring the main heading and description
 */
export function HeroSection() {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    About Naruto Universe
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl font-serif">
                    Dive into the vast and intricate world of Naruto. Our platform
                    provides comprehensive information about characters, clans,
                    villages, and the incredible jutsu that define the ninja world.
                </p>
            </div>
        </section>
    );
}
