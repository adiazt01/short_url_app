import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { urlSchema } from "./_schemas/FormSchemas";
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
import { createShortUrlAction } from "./_actions/FormUrlActions";
import { getUrlsByUserId } from "./_lib/UrlData";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import UrlContainer from "./_components/container/UrlContainer";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  /*    const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "", shortUrl: ""},
  });  */

  /*   async function onSubmit(data: z.infer<typeof urlSchema>) {
    const formData = new FormData();
    formData.append("url", data.url);
    formData.append("shortUrl", data.shortUrl);
    const res = await createShortUrlAction(formData);
    console.log(res);
  } */

  /*   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="url">URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the URL of the page you want to track
              </FormDescription>
              <FormMessage>{form.formState.errors.url?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="shortUrl">Short URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the short URL you want to use
              </FormDescription>
              <FormMessage>{form.formState.errors.shortUrl?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>  */

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
