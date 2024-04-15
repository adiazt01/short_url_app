"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
    setError,
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res?.error) {
      setError("root", {
        type: "costum",
        message: res.error,
      });
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Register
      </h2>
      <p className="text-sm text-muted-foreground">
        Register in our platform for begin
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
          <Label htmlFor="username">
            Username
            <Input
              type="text"
              className="mt-2"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
              })}
              placeholder="JohnDoe"
            />
          </Label>
          {errors.username && (
            <small className="text-red-500">{errors.username.message}</small>
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="********"
            />
          </Label>
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>
        <Separator className="my-4" />
        {errors.root && (
          <small className="text-red-500 text-center">
            {errors.root.message}
          </small>
        )}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="flex mt-4 justify-end">
        <small className="text-sm font-medium leading-none">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </small>
      </div>
    </div>
  );
}
