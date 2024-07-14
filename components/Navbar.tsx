import Link from "next/link";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <header className="border-b shadow-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-2 py-5">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">Flow jobs</span>
        </Link>

        <Button>
          <Link href={"/jobs/new"}>Post job</Link>
        </Button>
      </nav>
    </header>
  );
}
