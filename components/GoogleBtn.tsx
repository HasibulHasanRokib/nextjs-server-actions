import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function GoogleBtn() {
  return (
    <>
      <Button
        type="button"
        onClick={() => signIn("google", { redirectTo: "/" })}
        className="w-full"
        variant={"outline"}
      >
        Sign in with Google
      </Button>
    </>
  );
}
