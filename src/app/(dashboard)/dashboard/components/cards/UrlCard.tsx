"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mouse } from "lucide-react";
import { Url as PrismaUrl, Click, Group } from "@prisma/client";
import { DropdownCardUrl } from "../dropdowns/DropdownCardUrl";
import { Badge } from "@/components/ui/badge";

interface Url extends PrismaUrl {
  clicks: Click[];
  group: Group | null;
}

interface UrlCardProps {
  url: Url;
}

export default function UrlCard({ url }: UrlCardProps) {
  const { url: longUrl, shortUrl, clicks } = url;

  return (
    <Card className="min-h-24 flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex justify-between items-center flex-row p-2">
        <div className="flex w-3/4 flex-col">
          <CardTitle className="text-sm truncate">{shortUrl}</CardTitle>
          <CardDescription className="truncate text-xs">
            {longUrl}
          </CardDescription>
        </div>
        <div className="flex">
          <DropdownCardUrl url={url} />
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center p-2">
        <div className="flex flex-row items-center">
          <Mouse className="w-4 h-4 mr-1" />
          <span className="text-xs"> {clicks && clicks.length} clicks</span>
        </div>
        {url.group && url.group && (
          <div className="flex items-end">
            <Badge className="text-xs max-w-32 truncate text-left">
              {
                url.group.name.length > 20 ? url.group.name.substring(0, 10) + "..." : url.group.name 
              }
            </Badge>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
