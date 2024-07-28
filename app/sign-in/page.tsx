import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignIn() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div>
      <SignInForm />
    </div>
  );
}
