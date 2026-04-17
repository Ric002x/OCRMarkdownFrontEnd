"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Icon from "@/public/icon.svg"
import Image from "next/image";


export const Header = () => {
    const { theme, setTheme } = useTheme()

    return (
        <header className="bg-foreground h-header sticky top-0 z-50 border-b border-black/10 dark:border-b-white/20 animate-slide-down">
            <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2 h-full">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Image src={Icon} alt="Site icon" width={32} height={32} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Transcreve<span
                        className="text-2xl text-[#F3A09A]">.</span><span className="text-primary">AI</span></span>
                </div>

                <Button variant="link" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hover:border hover:border-black/30 dark:hover:border-white/30 hover:shadow-sm cursor-pointer">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-black" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-white" />
                </Button>
            </div>
        </header>
    )
}