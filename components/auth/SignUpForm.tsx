"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, TSignUpSchema } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import { register } from "@/actions/signUpAction";
import GoogleBtn from "./GoogleBtn";

export default function SignUpForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signUp = (values: TSignUpSchema) => {
    startTransition(async () => {
      await register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        form.reset();
      });
    });
  };

  return (
    <div className="mx-auto my-10 max-w-5xl">
      <div className="my-2 text-center">
        <h2 className="my-3 text-2xl font-semibold">Create Account</h2>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <div className="mx-auto max-w-xl p-4 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUp)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Jhon Dev" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <h5 className="text-center">-OR-</h5>
        <GoogleBtn />

        <div className="text-center">
          <Button variant={"link"}>
            <Link className="text-sm text-muted-foreground" href={"/sign-in"}>
              Already have an account.
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
