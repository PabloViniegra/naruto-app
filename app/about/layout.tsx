import { Navbar } from "@/core";

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
