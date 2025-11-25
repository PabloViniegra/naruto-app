"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Users, Shield, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

type NavLink = {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

const navLinks = [
    { href: "/characters", label: "Characters", icon: Users },
    { href: "/clans", label: "Clans", icon: Shield },
    { href: "/villages", label: "Villages", icon: MapPin },
    { href: "/about", label: "About", icon: Info },
] as const satisfies readonly NavLink[];

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
        setTheme(newTheme);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-mono text-lg font-bold transition-colors hover:text-primary"
                >
                    Naruto Universe
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-1 sm:flex">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname.startsWith(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" aria-hidden="true" />
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center gap-1 sm:hidden">
                    {navLinks.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname.startsWith(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center justify-center rounded-md p-3 min-w-[44px] min-h-[44px] transition-colors",
                                    isActive
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                                aria-label={label}
                            >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        );
                    })}
                </div>

                {/* Theme Switcher */}
                <ThemeSwitcher
                    value={theme as "light" | "dark" | "system" | undefined}
                    onChange={handleThemeChange}
                />
            </div>
        </nav>
    );
}
