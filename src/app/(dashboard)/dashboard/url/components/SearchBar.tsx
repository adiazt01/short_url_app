"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm")?.toString()
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  const handleSearch = useCallback(
    (term: string) => {
      console.log("searching for", term);
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (term) {
        newSearchParams.set("searchTerm", term);
        newSearchParams.set("page", "1");
      } else {
        newSearchParams.delete("searchTerm");
      }

      replace(`${pathname}?${newSearchParams.toString()}`);
      refresh();
    },
    [searchParams, pathname, replace, refresh]
  );

  useEffect(() => {
    handleSearch(debouncedSearchTerm || "");
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <Label htmlFor="search">
      Search for a URL
      <Input
        placeholder="Web of cats, Wikipedia of dogs, Facebook group..."
        type="search"
        className="mt-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Label>
  );
}
