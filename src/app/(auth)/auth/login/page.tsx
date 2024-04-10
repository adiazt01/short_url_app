"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <Input type="email" {...register("email")} placeholder="Email" />
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
