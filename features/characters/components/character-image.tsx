"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CharacterImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CharacterImage({ src, alt, className }: CharacterImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          className
        )}
        role="img"
        aria-label={`No image available for ${alt}`}
      >
        <User className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${alt} - Naruto character portrait`}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
      onError={() => setHasError(true)}
    />
  );
}
