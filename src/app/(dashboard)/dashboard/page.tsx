import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import UrlContainer from "./components/container/UrlContainer";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              href="dashboard/url/create"
              className={buttonVariants({ variant: "outline" })}
            >
              Click here
            </Link>
          </li>
        </ul>
      </div>
      <Separator className="my-4" />
      <Suspense fallback={<div>Loading...</div>}>
        <UrlContainer />
      </Suspense>
    </div>
  );
}
