import { redirect } from "next/navigation";
// FIXME: import { auth } from "../../../../auth";
import { auth } from "../../../../auth";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
        <main className="w-full flex flex-col justify-start items-center pt-16 md:pt-20 bg-white min-h-screen transition">
          <div className="max-w-4xl p-8 w-full">
            <div className="flex mb-8 flex-row items-start">
             <BreadcrumbDashboard/>
            </div>
            {children}
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
