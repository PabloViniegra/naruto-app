import Link from "next/link";
import { EXPLORE_FEATURES } from "../constants";
import { getFeatureDelay } from "../config/animations";

/**
 * Features section showing explorable content categories
 */
export function FeaturesSection() {
    return (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 sm:space-y-6">
            <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl">What You Can Explore</h2>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                {EXPLORE_FEATURES.map((feature, index) => (
                    <Link
                        key={feature.title}
                        href={feature.href}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:bg-secondary/30 group animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[120px] flex flex-col justify-center sm:p-6"
                        style={{
                            animationDelay: `${getFeatureDelay(index)}ms`,
                        }}
                    >
                        <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-all duration-300 group-hover:tracking-wide leading-tight sm:text-lg">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 sm:text-base">
                            {feature.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
