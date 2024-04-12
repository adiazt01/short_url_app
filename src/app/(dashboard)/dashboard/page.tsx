import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { urlSchema } from "./schemas/FormSchemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createShortUrlAction } from "./actions/FormUrlActions";
import { getUrlsByUserId } from "./lib/UrlData";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import UrlContainer from "./components/container/UrlContainer";
import { Plus } from "lucide-react";

export default async function DashboardPage() {

  return (
    <div className="flex flex-col p-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <ul className="flex items-center space-x-4">
          <li>
            <Button size="sm">
              {" "}
              <Plus className="mr-2 h-4 w-4" />
              Create url
            </Button>
          </li>
        </ul>
      </div>
      <Separator className="my-4" />
      <Suspense fallback={<div>Loading...</div>}>
        <UrlContainer />
      </Suspense>
    </div>
  );
}
