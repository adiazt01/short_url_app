"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <Input
      placeholder="Search for a URL"
      onChange={(event) => {
        handleSearch(event.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
