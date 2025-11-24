"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CharactersSearchProps {
    className?: string;
}

export function CharactersSearch({ className }: CharactersSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const initialQuery = searchParams.get("q") ?? "";
    const [value, setValue] = useState(initialQuery);
    const lastSyncedQueryRef = useRef(initialQuery);

    // Sync input value when URL changes externally
    useEffect(() => {
        const nextQuery = searchParams.get("q") ?? "";

        if (lastSyncedQueryRef.current === nextQuery) {
            return;
        }

        lastSyncedQueryRef.current = nextQuery;

        startTransition(() => {
            setValue(nextQuery);
        });
    }, [searchParams, startTransition]);

    const updateSearchParams = useCallback(
        (query: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (query.trim()) {
                params.set("q", query.trim());
                // Reset to page 1 when searching
                params.delete("page");
            } else {
                params.delete("q");
            }

            startTransition(() => {
                router.push(`/characters?${params.toString()}`, {
                    scroll: false,
                });
            });
        },
        [router, searchParams]
    );

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (value !== initialQuery) {
                updateSearchParams(value);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [value, initialQuery, updateSearchParams]);

    const handleClear = () => {
        setValue("");
        updateSearchParams("");
    };

    return (
        <div
            className={cn(
                "relative w-full max-w-xs animate-in fade-in slide-in-from-right-4 duration-300",
                className
            )}
        >
            <Search
                className={cn(
                    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors",
                    isPending && "animate-pulse"
                )}
            />
            <Input
                type="text"
                placeholder="Search characters..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={cn(
                    "pl-9 pr-9 transition-all duration-200",
                    "focus:ring-2 focus:ring-ring/50 rounded-xl",
                    isPending && "opacity-70"
                )}
                aria-label="Search characters"
            />
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
