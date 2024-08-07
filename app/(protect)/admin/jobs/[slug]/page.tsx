import AdminBtn from "@/app/(protect)/_components/adminBtn";
import { auth } from "@/auth";
import JobDetails from "@/components/JobDetails";
import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";

interface PageParams {
  params: {
    slug: string;
  };
}

export default async function page({ params: { slug } }: PageParams) {
  const session = await auth();
  // if (session?.user?.role !== "ADMIN") redirect("/");

  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) return notFound;

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-5 space-y-6 p-4 md:items-start">
      <JobDetails job={job} />
      <AdminBtn job={job} />
    </div>
  );
}
