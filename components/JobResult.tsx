import { jobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterProps {
  filterValues: jobFilterValues;
  page?: number;
}

export default async function JobResult({
  filterValues,
  page = 1,
}: FilterProps) {
  const { q, type, location, remote } = filterValues;

  const perPage = 4;

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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const totalJobPromise = prisma.job.count({ where });

  const [jobs, totalJobsResult] = await Promise.all([
    jobsPromise,
    totalJobPromise,
  ]);
  const totalPages = Math.floor(totalJobsResult / perPage);
  return (
    <div className="grow space-y-2">
      {jobs.map((job) => {
        return (
          <Link className="block" key={job.id} href={`/jobs/${job.slug}`}>
            <JobListItem job={job} />
          </Link>
        );
      })}
      {jobs.length === 0 && <p className="my-10 text-center">No jobs found.</p>}

      <Pagination
        currentPage={page}
        filterValues={filterValues}
        totalPage={totalPages}
      />
    </div>
  );
}
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  filterValues: jobFilterValues;
}
function Pagination({
  currentPage,
  totalPage,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generateLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
      total_page: totalPage.toString(),
    });
    return `/?${searchParams.toString()}`;
  }
  return (
    <div className="flex items-center justify-between px-1">
      <Link
        className={cn(
          "flex items-center text-sm",
          currentPage <= 1 && "invisible",
        )}
        href={generateLink(currentPage - 1)}
      >
        <ArrowLeft size={16} /> Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPage}
      </span>
      <Link
        className={cn(
          "flex items-center text-sm",
          currentPage >= totalPage && "invisible",
        )}
        href={generateLink(currentPage + 1)}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
