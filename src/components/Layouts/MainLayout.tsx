import { Footer } from "./Footer"
import { Header } from "./Header"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="p-8 min-h-main">
                {children}
            </main>
            <Footer />
        </>
    )
}