"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "../Spinner";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useSearchParams } from "next/navigation";
import { emailVerification } from "@/actions/emailVerification";
export default function ActiveForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  

  const onsubmit = useCallback(() => {
    if (!token) {
      setError("Missing token.");
      return;
    }
    emailVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onsubmit();
  }, [onsubmit]);

  return (
    <div className="mx-auto flex h-[500px] max-w-5xl items-center justify-center">
      {/* <div className=""> */}
        <Card className="w-[550px]">
          <CardHeader className="text-center">
            <CardTitle>Verification</CardTitle>
            <CardDescription>Verify your email account.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {!error && !success && <Spinner />}

            <FormError message={error} />
            <FormSuccess message={success} />
          </CardContent>
          <CardFooter className="">
            <Link href={"/sign-in"} className="text-sm hover:underline">
              Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    // </div>
  );
}
