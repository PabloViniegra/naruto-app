export const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <main id="main-content" className="min-h-screen w-full max-w-7xl mx-auto bg-background">
            {children}
        </main>
    );
};
