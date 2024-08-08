import { auth } from "@/auth";
import JobListItem from "@/components/JobListItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();
  if (session?.user?.role !== "USER") redirect("/");

  const userJobs = await prisma.job.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4">
      <div className="my-5 flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} alt="Avatar" />
          <AvatarFallback className="bg-sky-500 text-white">
            {session?.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-1.5">
          <p className="text-muted-foreground">{session?.user?.name}</p>
          <Badge className="px-2">{session?.user?.role}</Badge>
        </div>
      </div>
      <div className="grow space-y-2">
        {userJobs.map((job) => {
          return (
            <Link
              className="block"
              key={job.id}
              href={`/user/jobs/${job.slug}`}
            >
              <JobListItem job={job} />
            </Link>
          );
        })}
        {userJobs.length === 0 && (
          <p className="my-10 text-center">No jobs found.</p>
        )}
      </div>
    </div>
  );
}
