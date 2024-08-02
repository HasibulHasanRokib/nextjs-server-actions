"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema, TSignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import { login } from "@/actions/signInAction";
import GoogleBtn from "./GoogleBtn";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const searchparams = useSearchParams();
  const urlError =
    searchparams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = (values: TSignInSchema) => {
    startTransition(async () => {
      await login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        form.reset();
      });
    });
  };

  return (
    <div className="mx-auto my-10 max-w-5xl">
      <div className="my-2 text-center">
        <h2 className="my-3 text-2xl font-semibold">Welcome</h2>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <div className="mx-auto max-w-xl space-y-4 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@ex.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button variant={"link"} className="p-0">
                    <Link className="font-normal" href={"/forget-password"}>Forget password?</Link>
                  </Button>
                </FormItem>
              )}
            />

            <FormError message={error || urlError} />
            <FormSuccess message={success} />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <h5 className="text-center">-OR-</h5>
        <GoogleBtn />
        <div className="text-center">
          <Button variant={"link"}>
            <Link className="text-sm text-muted-foreground" href={"/sign-up"}>
              Don`t have any account.
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
