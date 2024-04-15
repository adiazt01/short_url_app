"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Computer,
  Home,
  LayoutDashboard,
  Link2,
  LogOut,
  Moon,
  MoonIcon,
  Sun,
  SunIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const user = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="z-50 sticky w-full top-0 flex justify-center items-center flex-row h-14 border-b backdrop-blur bg-white/50 dark:bg-black/50">
      <div className="flex justify-between items-center text-sm w-full max-w-4xl px-4">
        <div className="flex w-full flex-row justify-between items-center">
          <a href="/" className="text-lg font-bold">
            ShortBuddy
          </a>
          <nav className="flex flex-row justify-between items-center font-medium gap-3">
            <Link
              className="flex flex-row gap-1 items-center"
              href="/dashboard"
            >
              <Home className="w-4 mb-0.5 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              className="flex flex-row gap-1 items-center"
              href="/dashboard/url"
            >
              <Link2 className="w-4 h-4" />
              <span>URL&apos;s</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full border"
                  size="icon"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 rounded-full" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <SunIcon className="w-5 h-5 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon className="w-5 h-5 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Computer className="w-5 h-5 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full border"
                  size="icon"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
