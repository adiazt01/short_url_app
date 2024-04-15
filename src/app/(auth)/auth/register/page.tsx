"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const error = await res.json();
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <Input type="email" {...register("email")} placeholder="Email" />
        <Input type="text" {...register("username")} placeholder="Username" />
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <Button disabled={isSubmitting} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
