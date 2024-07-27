import { Job } from "@prisma/client";
import { Briefcase, Globe2, MapPin } from "lucide-react";

import Image from "next/image";

interface JobDetailsProps {
  job: Job;
}

export default function JobDetails({ job }: JobDetailsProps) {
  return (
    <section className="">
      <div className="">
        <Image
          src={job.companyLogoUrl!}
          alt={job.title}
          width={100}
          height={100}
          className="self-center rounded-lg"
        />
        <div className="">
          
        </div>
      </div>
    </section>
  );
}
