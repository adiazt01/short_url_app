import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import UrlContainer from "./components/container/UrlContainer";
import Link from "next/link";
import CardContainerSkeleton from "./components/skeleton/CardContainerSkeleton";
import { PreviewData } from "./components/container/PreviewData";
import { Plus } from "lucide-react";
import PreviewDataSkeleton from "./components/skeleton/PreviewDataSkeleton";

export default async function DashboardPage() {
  return (
    <div className="flex gap-4 flex-col w-full">
      <section className="flex flex-col justify-between items-center">
        <header className="flex gap-4 w-full flex-col">
          <div className="flex sm:flex-row flex-col gap-4 justify-between">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              Dashboard
            </h2>
            <ul className="flex flex-row gap-4">
              <li>
                <Button size="sm" asChild>
                  <Link href="/dashboard/url/create">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Url
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <Separator className="mb-4" />
          <div className="flex gap-4 flex-col sm:flex-row w-full">
            <Suspense fallback={<PreviewDataSkeleton />}>
              <PreviewData />
            </Suspense>
          </div>
        </header>
      </section>
      <Separator className="mt-8 mb-4" />
      <Suspense fallback={<CardContainerSkeleton />}>
        <UrlContainer />
      </Suspense>
    </div>
  );
}
