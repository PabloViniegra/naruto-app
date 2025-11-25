import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_LINKS } from "../constants";

/**
 * API credit section highlighting the Dattebayo API
 */
export function ApiCreditSection() {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="rounded-lg border border-border bg-secondary/30 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:bg-secondary/50 group">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold sm:text-3xl transition-colors duration-300 group-hover:text-primary">
                        Powered By
                    </h2>
                    <p className="text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground/80">
                        This application is built on top of the incredible{" "}
                        <span className="font-bold text-foreground hover:text-primary transition-colors duration-300 cursor-help">
                            Dattebayo API
                        </span>
                        , a comprehensive and community-driven API that provides detailed
                        information about the Naruto universe.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {API_LINKS.map((link) => (
                            <Button
                                key={link.href}
                                asChild
                                variant={link.variant}
                                className="rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/20"
                            >
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </div>

                    <div className="mt-6 p-4 rounded bg-background/50 border border-border hover:border-primary/30 transition-all duration-300 hover:bg-background/70">
                        <p className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground/70">
                            <span className="font-mono font-bold">Dattebayo API</span> is a
                            RESTful API that provides comprehensive information about
                            characters, clans, villages, jutsu, and more from the Naruto
                            universe. It&apos;s maintained by a passionate community of Naruto
                            fans and developers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
