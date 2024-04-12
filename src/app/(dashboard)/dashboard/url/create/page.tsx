"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { urlSchema } from "../../schemas/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShortUrlAction } from "../../actions/FormUrlActions";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateUrlPage() {
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "", shortUrl: "" },
  });

  async function onSubmit(data: z.infer<typeof urlSchema>) {
    const formData = new FormData();
    formData.append("url", data.url);
    formData.append("shortUrl", data.shortUrl);
    const res = await createShortUrlAction(formData);
    console.log(res);
  }

  return (
    <Form {...form}>
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
              <FormMessage>
                {form.formState.errors.shortUrl?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
