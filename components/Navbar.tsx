import Link from "next/link";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  console.log(session?.user);

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
            <Avatar>
              {session.user.image ? (
                <AvatarImage src={session.user.image} alt="image" />
              ) : (
                <AvatarFallback className="bg-orange-500/50">
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        ) : (
          <Button variant="outline">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
