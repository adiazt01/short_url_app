"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    console.log(res);

    if (res?.error) {
      setError("root", {
        type: "custom",
        message: "Email or password is incorrect",
      });
    }

    if (!res?.error) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Login
      </h2>
      <p className="text-sm text-muted-foreground">
        Use your credentials to login and access your dashboard
      </p>
      <Separator className="mt-4" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 py-4 flex-col space-y-3"
      >
        <div>
          <Label htmlFor="email">
            Email
            <Input
              type="email"
              className="mt-2"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="example@mail.com"
            />
          </Label>
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>

        <div>
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              className="mt-2"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="********"
            />
          </Label>
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>
        <Separator className="mt-4" />
        {errors.root && (
          <small className="text-red-500 text-center">
            {errors.root.message}
          </small>
        )}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        {errors.root && <span>{errors.root.message}</span>}
      </form>
      <div className="flex mt-4 justify-end">
        <small className="text-sm font-medium leading-none">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </small>
      </div>
    </div>
  );
}
