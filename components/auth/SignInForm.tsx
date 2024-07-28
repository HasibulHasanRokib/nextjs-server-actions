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
import GoogleBtn from "../GoogleBtn";
import Link from "next/link";

export default function SignInForm() {
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const submit = (values: TSignInSchema) => {
    console.log(values);
  };

  return (
    <div className="mx-auto my-10 max-w-5xl">
      <div className="my-2 text-center">
        <h2 className="my-3 text-2xl font-semibold">Welcome</h2>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <div className="mx-auto max-w-xl p-4">
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
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="my-2 text-center">
          <span>-or-</span>
        </div>
        <GoogleBtn />
        <div className="my-2">
          <p className="text-sm text-muted-foreground">
            Dont have any account.
            <Link className="font-bold hover:underline" href={"/sign-up"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
