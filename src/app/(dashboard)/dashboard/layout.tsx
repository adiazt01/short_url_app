import { redirect } from "next/navigation";
// FIXME: import { auth } from "../../../../auth";
import { auth } from "../../../../auth";
import Navbar from "./components/Navbar";
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
        <main className="w-full flex flex-col justify-start items-center pt-20 md:pt-28 bg-white md:bg-slate-100 min-h-screen transition">
          <div className="max-w-4xl md:border w-full">{children}</div>
        </main>
      </SessionProvider>
    </>
  );
}
