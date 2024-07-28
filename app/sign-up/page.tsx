import { auth } from "@/auth";
import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function SignUp() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
