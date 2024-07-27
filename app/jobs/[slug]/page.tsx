import JobDetails from "@/components/JobDetails";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function page({ params: {slug} }: PageProps) {
const job = await getJob(slug);

const{applicationEmail,applicationUrl}=job;

const applicationLink = applicationEmail?
`mailto:${applicationEmail}`
:applicationUrl;

if(!applicationLink){
  console.log("Job has no email or email.");
  notFound();
}




  return <div className="max-w-5xl mx-auto p-4 my-10 space-y-6">
    <JobDetails job={job}/>
    <Button asChild>
     <a href={applicationLink} target="_blank">Apply</a>
    </Button>
  </div>;
}
