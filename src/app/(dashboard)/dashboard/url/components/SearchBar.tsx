"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchTerm", term);
      params.set("page", "1");
    } else {
      params.delete("searchTerm");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Label htmlFor="search">
      Search for a URL
      <Input
        placeholder="Web of cats, Wikipedia of dogs, Facebook group..."
        type="search"
        className="mt-2"
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        defaultValue={searchParams.get("searchTerm")?.toString()}
      />
    </Label>
  );
}
