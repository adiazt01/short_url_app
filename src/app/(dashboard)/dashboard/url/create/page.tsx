"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { urlSchema } from "../schemas/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Group } from "@prisma/client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogCreateGroup } from "../../components/dialog/DialogCreateGroup";
import { createShortUrlAction } from "../actions/FormUrlActions";

export default function CreateUrlPage() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "", group: "" },
  });

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/group");
      const data = await res.json();
      setGroups(data);
    };

    fetchGroups();
  }, []);

  async function onSubmit(data: z.infer<typeof urlSchema>) {
    const formData = new FormData();
    formData.append("url", data.url);
    if (data.group) {
      formData.append("group", data.group);
    }
    console.log(Object.fromEntries(formData.entries()));
    const res = await createShortUrlAction(formData);
    console.log(res);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex mx-auto flex-col max-w-lg gap-4 w-full">
        <header>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            Create URL
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a short URL for your long URL, and share it with others
          </p>
        </header>
        <Separator />
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url">URL</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full md:w-96" />
                  </FormControl>
                  <FormDescription>
                    Enter the URL you want to shorten
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.url?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <Select
                    disabled={groups.length === 0}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {groups.length === 0 && (
                    <FormDescription>
                      You need to create a group first
                    </FormDescription>
                  )}
                  <FormMessage>
                    {form.formState.errors.group?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>

            <Button className="md:mr-auto" type="submit">
              <Plus size={16} className="mr-2" />
              Create URL
            </Button>
          </form>
        </Form>
      </div>

      <DialogCreateGroup setOpen={setOpen} setGroups={setGroups} />
    </Dialog>
  );
}
