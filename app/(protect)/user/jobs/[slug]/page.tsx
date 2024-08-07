import UserBtn from "@/app/(protect)/_components/userBtn";
import { auth } from "@/auth";
import JobDetails from "@/components/JobDetails";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job.title,
  };
}

export default async function page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("Job has no email or email.");
    notFound();
  }
  const session = await auth();
  if (session?.user?.role !== "USER") redirect("/");
  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-5 space-y-6 p-4 md:items-start">
      <JobDetails job={job} />
      <UserBtn job={job} />
    </div>
  );
}
