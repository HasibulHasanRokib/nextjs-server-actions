import { signOut } from "@/auth";
import { Button } from "../ui/button";

export default function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="outline">
        Sign out
      </Button>
    </form>
  );
}
