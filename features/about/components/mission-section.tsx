import { MISSION_CARDS } from "../constants";
import { MissionCard } from "./mission-card";

/**
 * Mission section showcasing the platform's key capabilities
 */
export function MissionSection() {
    return (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 sm:space-y-6">
            <h2 className="text-xl font-bold leading-tight sm:text-2xl md:text-3xl">Our Mission</h2>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                {MISSION_CARDS.map((card) => (
                    <MissionCard
                        key={card.title}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>
        </section>
    );
}
