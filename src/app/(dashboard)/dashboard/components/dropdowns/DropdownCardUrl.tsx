"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bolt } from "lucide-react";
import {
  Dialog,
} from "@/components/ui/dialog";
import { Url } from "@prisma/client";
import { DialogCardCopyUrl } from "../dialog/DialogCardCopyUrl";
import { DialogCardDeleteUrl } from "../dialog/DialogCardDeleteUrl";

export function DropdownCardUrl({ url }):{
  url: Url;
} {
  const { shortUrl, id } = url;

  console.log(id);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-7 h-7 rounded-full border -mt-3">
          <Bolt className="w-4 mx-auto h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogCardCopyUrl shortUrl={shortUrl} />
          <DialogCardDeleteUrl id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
