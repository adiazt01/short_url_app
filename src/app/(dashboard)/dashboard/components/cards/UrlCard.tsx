"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mouse } from "lucide-react";
import { Url as PrismaUrl, Click, Tag } from "@prisma/client";
import DropdownCardUrl from "../dropdowns/DropdownCardUrl";

interface Url extends PrismaUrl {
  clicks: Click[];
  tags: Tag[];
}

interface UrlCardProps {
  url: Url;
}

export default function UrlCard({ url }: UrlCardProps) {
  const { url: longUrl, shortUrl, clicks, tags } = url;

  console.log(url);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex justify-between items-center flex-row p-2">
        <div className="flex w-3/4 flex-col">
          <CardTitle className="text-sm truncate">{shortUrl}</CardTitle>
          <CardDescription className="truncate text-xs">
            {longUrl}
          </CardDescription>
        </div>
        <div className="flex">
          <DropdownCardUrl />
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <Mouse className="w-4 h-4 mr-1" />
          <span className="text-xs"> {clicks && clicks.length} clicks</span>
        </div>
      </CardFooter>
    </Card>
  );
}
