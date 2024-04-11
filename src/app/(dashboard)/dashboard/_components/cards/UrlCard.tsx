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

interface UrlCardProps {
  url: Url;
}

export default function UrlCard({ url }: UrlCardProps) {
  const { shortUrl, url: longUrl } = url;

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
          <DropdownMenu>
            <DropdownMenuTrigger className="w-7 h-7 rounded-full border -mt-3">
              <Bolt className="w-4 mx-auto h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <Mouse className="w-4 h-4 mr-1" />
          <span className="text-xs">{url.clicks} clicks</span>
        </div>
      </CardFooter>
    </Card>
  );
}
