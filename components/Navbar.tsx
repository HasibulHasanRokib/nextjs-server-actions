import Link from "next/link";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import SignOutBtn from "./auth/SignOutBtn";
import { Clipboard, LogOut } from "lucide-react";

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

            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session.user.image || ""} alt="avatar" />
                    <AvatarFallback className="bg-sky-400 text-white">
                      {session.user.name?.toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {session.user.role === "ADMIN" ? (
                    <DropdownMenuItem>
                      <Clipboard className="mr-2 h-4 w-4" />
                      <button>
                        <Link href={"/admin/dashboard"}>Dashboard</Link>
                      </button>
                    </DropdownMenuItem>
                  ) : (
                    ""
                  )}
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <SignOutBtn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex gap-1.5">
            <Button variant={"outline"}>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
