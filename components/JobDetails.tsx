import { formatMoney, relativeData } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobDetailsProps {
  job: Job;
}

export default function JobDetails({ job }: JobDetailsProps) {
  return (
    <section  className="space-y-4">
      <div>
        <Image
          src={job.companyLogoUrl!}
          alt={job.title}
          width={100}
          height={100}
          className="self-center rounded-lg"
        />
        <div className="flex-grow space-y-3">
          <div>
            <h1 className="text-xl font-bold">{job.title}</h1>
            <p className="font-semibold">
              {job.applicationUrl ? (
                <Link
                  className="text-green-500 hover:underline"
                  href={new URL(job.applicationUrl).origin}
                >
                  {job.companyName}
                </Link>
              ) : (
                <span>{job.companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {job.type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {job.locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {job.location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(job.salary)}
            </p>
            <p className="flex items-center gap-1.5 ">
              <Clock size={16} className="shrink-0" />
              {relativeData(job.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div>{job.description && <Markdown>
        {job.description}
      </Markdown> }</div>
    </section>
  );
}
