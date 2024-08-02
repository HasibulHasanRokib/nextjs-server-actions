"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { NewPasswordSchema, TNewPasswordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { newPassword } from "@/actions/newPasswordAction";
import { useSearchParams } from "next/navigation";

export default function NewPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<TNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submit = (values: TNewPasswordSchema) => {
    setError("");
    setSuccess("");
    if (!token) {
      setError("Missing token.");
      return;
    }
    startTransition(async () => {
      await newPassword(values, token).then((data)=>{
        setSuccess(data?.success),
        setError(data?.error)
      });
    });
  };

  return (
    <div className="mx-auto flex h-[500px] max-w-5xl items-center justify-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>New Password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button className="w-full" type="submit">
                {isPending ? "Loading..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant={"link"}>
            <Link href={"/sign-in"}>Back to Signin</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
