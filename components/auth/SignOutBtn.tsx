import { signOut } from "@/auth";
import { LogOut } from "lucide-react";


export default function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" >
      Sign out
      </button>
    </form>
  );
}
