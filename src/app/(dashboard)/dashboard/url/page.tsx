import { Suspense } from "react";
import { UrlContainerPagination } from "./components/UrlContainerPagination";
import { SearchBar } from "./components/SearchBar";
import Pagination from "./components/Pagination";

export default function UrlsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  if (!searchParams) {
    searchParams = {
      query: "",
    };
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <UrlContainerPagination
          page={searchParams.page ? Number(searchParams.page) : 1}
          limit={5}
          query={searchParams.query}
        />
      </Suspense>
    </div>
  );
}
