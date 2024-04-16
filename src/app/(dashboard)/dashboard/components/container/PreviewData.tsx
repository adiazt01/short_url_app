import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalClicks, getTotalUrlsCreated } from "../../lib/UrlData";
import { Link2, Mouse } from "lucide-react";

export async function PreviewData() {
  const totalClicks = await getTotalClicks();
  const totalUrlsCreated = await getTotalUrlsCreated();
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between text-lg items-center">
            Total Clicks
            <Mouse className="w-5 h-5" />
          </CardTitle>
          <CardContent className="p-0 font-medium text-2xl">{totalClicks}</CardContent>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between text-lg items-center">
            Total URLs Created
            <Link2 className="w-5 h-5" />
          </CardTitle>
          <CardContent className="p-0 font-medium text-2xl">{totalUrlsCreated}</CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
