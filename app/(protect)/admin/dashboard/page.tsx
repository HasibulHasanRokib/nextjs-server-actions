import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobListItem from "@/components/JobListItem";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/app/(protect)/_components/Pagination";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  const pendingJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  const approvedJobs = await prisma.job.findMany({
    where: { approved: true },
  });

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const userListPromise = prisma.user.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const totalUsersPromise = prisma.user.count();

  const [users, totalUsers] = await Promise.all([
    userListPromise,
    totalUsersPromise,
  ]);

  const totalPages = Math.ceil(totalUsers / Number(per_page));

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

      <div className="border p-1.5">
        <Pagination totalPages={totalPages} />

        <Table className="border">
          <TableCaption>A list of your current users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.image || ""} alt="Avatar" />
                      <AvatarFallback className="bg-sky-500 text-white">
                        {user.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.emailVerified === null ? (
                      <Badge variant={"destructive"}>No</Badge>
                    ) : (
                      <Badge variant={"primary"}>Yes</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="border p-2">
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
