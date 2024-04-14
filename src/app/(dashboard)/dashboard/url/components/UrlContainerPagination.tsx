import UrlCard from "../../components/cards/UrlCard";
import { getUrlsWithPagination } from "../lib/UrlData";
import Pagination from "./Pagination";



export async function UrlContainerPagination({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query?: string;
}) {
  const { urls, totalPages } = await getUrlsWithPagination(
    page,
    limit,
    query || ""
  );

  return (
    <div className="flex flex-col gap-4">
      {urls && urls.map((url) => (
        <UrlCard key={url.id} url={url} />
      ))}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
