import { signOut } from "@/auth";

export default function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/sign-in" });
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
