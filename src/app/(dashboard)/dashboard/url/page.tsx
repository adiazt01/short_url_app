import { Suspense } from "react";
import { UrlContainerPagination } from "./components/UrlContainerPagination";
import { SearchBar } from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { FilterBar } from "./components/FilterBar";

export default function UrlsPage({
  searchParams,
}: {
  searchParams?: {
    searchTerm?: string;
    page?: string;
    group?: string;
  };
}) {
  if (!searchParams) {
    searchParams = {
      searchTerm: "",
      page: "1",
      group: "",
    };
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <SearchBar />
      <FilterBar />
      <Suspense fallback={<div>Loading...</div>}>
        <UrlContainerPagination
          page={searchParams.page ? Number(searchParams.page) : 1}
          limit={6}
          group={searchParams.group}
          searchTerm={searchParams.searchTerm}
        />
      </Suspense>
    </div>
  );
}
