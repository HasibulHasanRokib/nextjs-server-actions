import { Job } from "@prisma/client";
import Image from "next/image";
import CompanyLogo from "@/public/images/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeData } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <article className="flex gap-7 rounded-md border p-5 hover:bg-muted/60">
      {job.companyLogoUrl ? (
        <Image
          src={job.companyLogoUrl || CompanyLogo}
          alt={job.title}
          width={100}
          height={100}
          className="self-center rounded-lg"
        />
      ) : (
        <div className="flex h-[100px] w-[100px] items-center justify-center text-3xl font-bold">
          <p>{job.title.slice(0, 2).toUpperCase()}</p>
        </div>
      )}
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
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
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeData(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge variant="outline">{job.type}</Badge>

        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} className="shrink-0" />
          {relativeData(job.createdAt)}
        </span>
      </div>
    </article>
  );
}
