import type { Metadata } from "next";
import { AboutContent } from "@/features/about";
import { MainContainer } from "@/core";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Naruto Universe, our mission to explore the ninja world, and the API powering our application.",
};

export default function AboutPage() {
    return (
        <MainContainer>
            <div className="w-full py-12 sm:py-16 md:py-20">
                <AboutContent />
            </div>
        </MainContainer>
    );
}
