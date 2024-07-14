import { jobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

interface FilterProps {
  filterValues: jobFilterValues;
}

export default async function JobResult({
  filterValues: { q, type, location, remote },
}: FilterProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => {
        return <JobListItem job={job} key={job.id} />;
      })}
      {jobs.length === 0 && <p className="my-10 text-center">No job found.</p>}
    </div>
  );
}
