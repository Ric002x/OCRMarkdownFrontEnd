import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { MainLayout } from "../components/Layouts/MainLayout";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "sonner";



const nunito = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TextData",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${nunito.className} antialiased text-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster position="top-center" />
        </ThemeProvider>

      </body>
    </html>
  );
}
