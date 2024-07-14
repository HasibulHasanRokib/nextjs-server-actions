import prisma from "@/lib/db";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { jobTypes } from "../lib/job-types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobFilterSchema, jobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import SubmitBtn from "./SubmitBtn";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, type, location, remote } = jobFilterSchema.parse(values);



  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
};

interface SidebarProps {
  defaultValues: jobFilterValues;
}



const FilterSidebar = async ({ defaultValues }: SidebarProps) => {
  const locations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((location) =>
      location.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit w-full rounded-md border bg-background p-4 md:w-[350px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)} className="space-y-5">

        {/* Search */}
        <div className="space-y-1">
          <Label htmlFor="q">Search</Label>
          <Input
            name="q"
            id="q"
            placeholder="Title,company, etc."
            defaultValue={defaultValues.q}
          />
        </div>

        {/* Type */}
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Select name="type"defaultValue={ "" || defaultValues.type} >
            <SelectTrigger>
              <SelectValue placeholder="All type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup id="type">
                {jobTypes.map((type) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Select name="location" defaultValue={ "" || defaultValues.location}>
            <SelectTrigger>
              <SelectValue placeholder="All location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locations.map((location) => {
                  return (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remote"
            className="scale-150 accent-black"
            defaultChecked={defaultValues.remote}
          />
          <Label>Remote jobs</Label>
        </div>
        <SubmitBtn title="Filter jobs"/>
      </form>
    </aside>
  );
};

export default FilterSidebar;
