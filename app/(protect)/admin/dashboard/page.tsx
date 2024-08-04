import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobListItem from "@/components/JobListItem";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  const pendingJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  const approvedJobs = await prisma.job.findMany({
    where: { approved: true },
  });

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="my-5 flex items-center gap-2">
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="bg-sky-500 text-white">
            {session?.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-1.5">
          <p className="text-muted-foreground">{session?.user?.name}</p>
          <Badge
            className="px-2"
            variant={
              session?.user?.role === "ADMIN" ? "destructive" : "primary"
            }
          >
            {session?.user?.role}
          </Badge>
        </div>
      </div>

      <div className="">
        <Tabs defaultValue="notApproved">
          <TabsList>
            <TabsTrigger value="notApproved">Not approved</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          <TabsContent value="notApproved">
            <div className="grow space-y-2">
              {pendingJobs.map((job) => {
                return (
                  <Link
                    className="block"
                    key={job.id}
                    href={`/admin/jobs/${job.slug}`}
                  >
                    <JobListItem job={job} />
                  </Link>
                );
              })}
              {pendingJobs.length === 0 && (
                <p className="my-10 text-center">No jobs found.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="approved">
          <div className="grow space-y-2">
              {approvedJobs.map((job) => {
                return (
                  <Link
                    className="block"
                    key={job.id}
                    href={`/admin/jobs/${job.slug}`}
                  >
                    <JobListItem job={job} />
                  </Link>
                );
              })}
              {approvedJobs.length === 0 && (
                <p className="my-10 text-center">No jobs found.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
