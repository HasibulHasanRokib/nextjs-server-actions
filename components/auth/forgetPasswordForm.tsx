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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/validation";
import { useState, useTransition } from "react";
import { resetPassword } from "@/actions/resetPasswordAction";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

export default function ForgetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const submit = (values: TForgetPasswordSchema) => {
    setError(""), setSuccess("");
    startTransition(async () => {
      await resetPassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        form.reset();
      });
    });
  };

  return (
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
                  disabled={isPending}
                  type="email"
                  {...field}
                  placeholder="example@ex.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}
