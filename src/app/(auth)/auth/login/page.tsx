"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data);
      const login = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!login?.error) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <Input type="email" {...register("email")} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <Button disabled={isSubmitting} type="submit">
          Login
        </Button>
        {errors.root && <span>{errors.root.message}</span>}
      </form>
    </div>
  );
}
