import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignIn() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
