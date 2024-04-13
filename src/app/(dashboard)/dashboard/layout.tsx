import { redirect } from "next/navigation";
// FIXME: import { auth } from "../../../../auth";
import { auth } from "../../../../auth";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

import BreadcrumbDashboard from "./components/BreadcrumbDashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <>
      <SessionProvider>
        <Navbar />
        <main className="w-full flex flex-col justify-start items-center pt-8 bg-white min-h-screen transition">
          <div className="max-w-[50rem] p-8 w-full">
            <div className="flex mb-4 mt-12 flex-row items-start">
              <BreadcrumbDashboard />
            </div>
            {children}
          </div>
        </main>
      </SessionProvider>
      <Toaster />
    </>
  );
}
