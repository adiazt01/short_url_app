"use client";

import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavbarLading() {
  const user = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="sticky w-full top-0 flex justify-center items-center flex-row h-14 border-b backdrop-blur bg-black bg-opacity-50">
      <div className="flex justify-between items-center text-sm w-full max-w-4xl px-4">
        <Link className="font-bold" href="/">
          Shortify
        </Link>
        <ul className="flex items-center flex-row gap-2 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-7 rounded border w-7"
                size="icon"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 rounded-full" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user && user.status === "authenticated" ? (
            <>
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
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
