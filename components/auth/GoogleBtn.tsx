import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function GoogleBtn() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant={"outline"}
      className="my-2 w-full space-x-2"
    >
      <FcGoogle size={20} />
      <p> Sign in with Google</p>
    </Button>
  );
}
