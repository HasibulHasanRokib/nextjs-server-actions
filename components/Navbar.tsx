import Link from "next/link";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant={"outline"}>
        Sign Out
      </Button>
    </form>
  );
}

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b shadow-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-2 py-5">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">Flow jobs</span>
        </Link>
        {session?.user ? (
          <div className="flex gap-1.5">
            <Button>
              <Link href={"/jobs/new"}>Post job</Link>
            </Button>
            <SignOut />
            {session.user.name && session.user.image && (
              <Image
                src={session.user.image}
                alt="User"
                width={35}
                height={30}
                className="rounded-full border object-cover"
              />
            )}
          </div>
        ) : (
          <Button>
            {" "}
            <Link href={"/api/auth/signin"}>Sign In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
