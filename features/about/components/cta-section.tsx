import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Call-to-action section encouraging users to start exploring
 */
export function CtaSection() {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:from-primary/15 hover:to-primary/10 group">
                <h2 className="text-2xl font-bold mb-4 sm:text-3xl transition-colors duration-300 group-hover:text-primary">
                    Ready to Explore the Ninja World?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto transition-colors duration-300 group-hover:text-foreground/80">
                    Start your journey through the Naruto universe. Discover characters,
                    uncover their abilities, and explore the intricate relationships that
                    shape the ninja world.
                </p>
                <Button
                    asChild
                    size="lg"
                    className="rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/30"
                >
                    <Link href="/characters">Start Exploring</Link>
                </Button>
            </div>
        </section>
    );
}
