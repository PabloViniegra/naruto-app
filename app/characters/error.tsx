"use client";

import { useEffect } from "react";
import { MainContainer } from "@/core";
import { Button } from "@/components/ui";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function CharactersError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Only log errors in development mode
        if (process.env.NODE_ENV === "development") {
            console.error("Characters page error:", error);
        }
    }, [error]);

    return (
        <MainContainer>
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-8 text-center">
                <div className="flex flex-col gap-2">
                    <h1 className="font-sans text-3xl font-bold">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        We could not load the characters. Please try again.
                    </p>
                </div>

                <Button onClick={reset} variant="outline">
                    Try again
                </Button>
            </div>
        </MainContainer>
    );
}
