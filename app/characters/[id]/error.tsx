"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MainContainer } from "@/core";
import { Button } from "@/components/ui";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CharacterDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Character detail page error:", error);
  }, [error]);

  return (
    <MainContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-8 px-4 text-center animate-in fade-in duration-500">
        <div className="flex flex-col gap-3">
          <h1 className="font-sans text-4xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            We could not load this character&apos;s information. Please try again or
            go back to the characters list.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild>
            <Link href="/characters" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Characters
            </Link>
          </Button>
        </div>
      </div>
    </MainContainer>
  );
}
