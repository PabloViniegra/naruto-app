import { MISSION_CARDS } from "../constants";
import { MissionCard } from "./mission-card";

/**
 * Mission section showcasing the platform's key capabilities
 */
export function MissionSection() {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
