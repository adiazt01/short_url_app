import UrlCard from "../../components/cards/UrlCard";
import { getUrlsWithPagination } from "../lib/UrlData";
import Pagination from "./Pagination";

export async function UrlContainerPagination({
  page,
  limit,
  group,
  searchTerm,
}: {
  page: number;
  limit: number;
  group?: string;
  searchTerm?: string;
}) {
  const { urls, totalPages } = await getUrlsWithPagination(
    page,
    limit,
    searchTerm || "",
    group || ""  
  );
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* @ts-ignore */}
        {urls && urls.map((url) => <UrlCard key={url.id} url={url} />)}
      </ul>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
