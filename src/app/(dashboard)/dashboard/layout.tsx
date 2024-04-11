import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";

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
        <main className="w-full flex flex-col justify-start items-center border pt-28 bg-white md:bg-slate-100 min-h-screen transition">
          <div className="max-w-4xl border w-full border-red-500">
          {children}
            </div>
        </main>
      </SessionProvider>
    </>
  );
}
