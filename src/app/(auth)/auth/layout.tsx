import { ThemeProvider } from "@/app/(landing)/context/ThemeProvider";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "../../globals.css";
import NavbarLading from "@/app/(landing)/components/NavbarLanding";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication",
  description: "Register or login in our platform for begin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <NavbarLading />
            <div className="w-full flex flex-col justify-center items-center mt-16">
              <div className="border p-5 shadow w-full rounded max-w-sm">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
