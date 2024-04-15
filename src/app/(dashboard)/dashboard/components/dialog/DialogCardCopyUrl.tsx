import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function DialogCardCopyUrl({ shortUrl }: { shortUrl: string }) {
  const { toast } = useToast();
  const path = usePathname();	
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(  `${process.env.NEXT_PUBLIC_SITE_URL}${path}/${shortUrl}`)

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      toast({
        title: "URL copied to clipboard",
        description: "You can now paste it anywhere you want.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <Copy className="w-5 h-5 mr-4" />
          Copy
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View URL</DialogTitle>
          <DialogDescription>
            Click the button below to copy the URL to your clipboard.
          </DialogDescription>
          <div className="flex gap-4 flex-row justify-center">
            <Input readOnly ref={inputRef} value={
              `https://short-url-app-kappa.vercel.app/api/su/${shortUrl}`
            } />
            <DialogClose>
              <Button onClick={() => handleCopy()}>
                <Copy className="w-4 h-4 mr-4" />
                Copy
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
