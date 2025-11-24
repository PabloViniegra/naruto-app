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
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-6xl font-bold" aria-hidden="true">404</p>
          <h1 className="font-sans text-2xl font-semibold">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </MainContainer>
  );
}
