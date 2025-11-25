import { Card } from "@/components/ui/card";
import type { MissionCard as MissionCardType } from "../types";

type MissionCardProps = MissionCardType;

/**
 * A reusable card component for displaying mission/feature information
 * with an icon, title, and description. Includes hover animations.
 */
export function MissionCard({
    icon: Icon,
    title,
    description,
    iconClassName,
}: MissionCardProps) {
    return (
        <Card className="p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group">
            <div className="space-y-4">
                <div className="inline-flex rounded-lg bg-secondary p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon
                        className={
                            iconClassName ||
                            "h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12"
                        }
                    />
                </div>
                <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                    {title}
                </h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {description}
                </p>
            </div>
        </Card>
    );
}
