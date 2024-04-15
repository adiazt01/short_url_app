"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  // TODO add loading state
  // TODO add error state
  // TODO add responsive design
  // TODO add logout button
  // TODO add user profile button

  return (
    <header className="fixed w-full flex items-center px-8 py-1.5 top-0 h-16 bg-white dark:bg-black border-b shadow-sm md:shadow transition">
      <div className="flex items-center justify-between w-full md:max-w-4xl mx-auto">
        <div className="flex w-full flex-row justify-between items-center">
          <a href="/" className="text-lg font-bold">
            ShortBuddy
          </a>
          <nav className="flex flex-row justify-between items-center gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/url">Urls</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
