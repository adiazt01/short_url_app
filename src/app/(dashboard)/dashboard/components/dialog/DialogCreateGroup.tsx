"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { groupSchema } from "../../url/schemas/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createGroupAction } from "../../url/actions/FormUrlActions";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export function DialogCreateGroup({
  setOpen,
  setGroups,
}: {
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: { group: "" },
  });

  async function onSubmit(data: z.infer<typeof groupSchema>) {
    const formData = new FormData();
    /* formData.append("group", data.group); */
    formData.append("group", data.group);

    try {
      const res = await createGroupAction(formData);

      if (res.error) {
        form.reset();
        form.setError("group", {
          type: "manual",
          message: res.error
        });
      } else {
        setGroups((prev) => [...prev, res.data]);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-col"
        >
          <DialogHeader>
            <DialogTitle>Create a group</DialogTitle>
            <DialogDescription>
              The group will be used to organize your URLs
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="group">Group name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full md:w-96"
                      placeholder="Instagram reels, Twitter links, etc."
                    />
                  </FormControl>
                  <FormDescription>
                    The group will be used to organize your URLs
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.url?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting && (
                <Loader className="w-5 h-5 mr-2 animation-spinner" />
              )}
              Create group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
