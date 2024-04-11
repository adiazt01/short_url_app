"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bolt, Edit, Eye, Mouse, Trash, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Url } from "@prisma/client";
import DropdownCardUrl from "../dropdowns/DropdownCardUrl";

interface UrlCardProps {
  url: Url;
}

export default function UrlCard({ url }: UrlCardProps) {
  const { shortUrl, url: longUrl, clicks } = url;

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
          <span className="text-xs">{clicks} clicks</span>
        </div>
      </CardFooter>
    </Card>
  );
}
