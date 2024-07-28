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
import GoogleBtn from "../GoogleBtn";
import Link from "next/link";

export default function SignUpForm() {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const signUp = (values: TSignUpSchema) => {
    console.log(values);
  };

  return (
    <div className="mx-auto my-10 max-w-5xl">
      <div className="my-2 text-center">
        <h2 className="my-3 text-2xl font-semibold">Create Account</h2>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <div className="mx-auto max-w-xl p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUp)} className="space-y-3">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="my-2 text-center">
          <span>-or-</span>
        </div>
        <GoogleBtn />
        <div className="my-2">
          <p className="text-sm text-muted-foreground">
            Already have an account.
            <Link className="font-bold hover:underline" href={"/sign-in"}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
