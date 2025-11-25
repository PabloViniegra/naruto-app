import Link from "next/link";
import { EXPLORE_FEATURES } from "../constants";
import { getFeatureDelay } from "../config/animations";

/**
 * Features section showing explorable content categories
 */
export function FeaturesSection() {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h2 className="text-2xl font-bold sm:text-3xl">What You Can Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EXPLORE_FEATURES.map((feature, index) => (
                    <Link
                        key={feature.title}
                        href={feature.href}
                        className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:bg-secondary/30 group animate-in fade-in slide-in-from-bottom-4 duration-700"
                        style={{
                            animationDelay: `${getFeatureDelay(index)}ms`,
                        }}
                    >
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-all duration-300 group-hover:tracking-wide">
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                            {feature.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
