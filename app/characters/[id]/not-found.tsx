import Link from "next/link";
import { MainContainer } from "@/core";
import { Button } from "@/components/ui";
import { ArrowLeft, UserX } from "lucide-react";

export default function CharacterNotFound() {
  return (
    <MainContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-8 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-sans text-4xl font-bold tracking-tight">
              Character Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              The character you&apos;re looking for doesn&apos;t exist or may have been
              removed from our database.
            </p>
          </div>
        </div>

        <Button asChild size="lg">
          <Link href="/characters" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Characters
          </Link>
        </Button>
      </div>
    </MainContainer>
  );
}
