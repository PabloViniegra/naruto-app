import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/core";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <MainContainer>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center px-4">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-5xl font-bold sm:text-6xl" aria-hidden="true">404</p>
          <h1 className="font-sans text-xl font-semibold sm:text-2xl">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base max-w-md">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Button asChild className="min-h-[44px] text-base sm:text-sm">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </MainContainer>
  );
}
