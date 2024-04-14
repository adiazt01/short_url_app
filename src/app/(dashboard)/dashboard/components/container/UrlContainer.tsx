import { getDashboardUrls } from "../../lib/UrlData";
import UrlCard from "../cards/UrlCard";

export default async function UrlContainer() {
  const urlsData = await getDashboardUrls();
  return (
    <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-hidden">
      {urlsData.map((url) => (
        <li key={url.id}>
          <UrlCard url={url} />
        </li>
      ))}
    </ul>
  );
}
