import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Blocks, DollarSign, Github, Lock } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Secure",
    description:
      "We take security very seriously, that's why we use the latest technologies to protect your data.",
    icon: Lock,
  },
  {
    title: "No ads",
    description:
      "We don't show ads, so you can create short links without interruptions.",
    icon: Blocks
  },
  {
    title: "Free",
    description:
      "ShortBuddy is free, you can create as many short links as you want.",
    icon: DollarSign
  },
  {
    title: "Analytics",
    description:
      "Track the number of clicks on your short links and see the most popular ones.",
    icon: BarChart
  },
];

export default function HomePage() {
  return (
    <>
      <main className="mt-40">
        <div className="flex flex-col w-full justify-center items-center">
          <header className="flex flex-col items-center">
            <Badge variant={"secondary"} className="mb-4 shadow py-1.5 px-2">
              <Github className="w-4 h-4 mr-1.5" />
              In continuos development
            </Badge>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight md:text-6xl">
              Welcome to ShortBuddy
            </h1>
            <p className="text-xl text-center text-muted-foreground mt-2 max-w-lg">
              Create short links and share them with your friends in a secure
              way, for free and without ads.
            </p>
          </header>
          <div className="flex flex-row mt-4">
            <Button className="rounded" asChild size={"sm"}>
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded ml-4"
              asChild
              size={"sm"}
            >
              <Link
                href="https://github.com/adiazt01/short_url_app"
                target="_blank"
              >
                <Github className="w-4 h-4 mr-2" />
                Github
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <section className="bg-white min-h-screen dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <small className="text-sm font-medium leading-none">
            ShortBuddy features
            </small>
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything you need to create short links
            </h2>
            <p className="text-lg text-muted-foreground">
              The most secure and easy way to create short links, share them
              with your friends and track the number of clicks.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <article key={index} className="relative pl-16">
                  <div className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-neutral-700 dark:text-neutral-300 text-2xl font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className=" text-neutral-600 dark:text-neutral-300">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
