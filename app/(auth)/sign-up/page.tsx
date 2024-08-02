import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function SignUp() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
