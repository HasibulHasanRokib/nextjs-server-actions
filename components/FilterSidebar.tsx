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
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, type, location, remote } = jobFilterSchema.parse(values);
};

const FilterSidebar = async () => {
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
      <form action={filterJobs} className="space-y-5">
        {/* Search */}
        <div className="space-y-1">
          <Label htmlFor="q">Search</Label>
          <Input name="q" id="q" placeholder="Title,company, etc." />
        </div>

        {/* Type */}
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Select name="type">
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
          <Select name="location">
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
            type="radio"
            name="remote"
            className="scale-150 accent-black"
          />
          <Label>Remote jobs</Label>
        </div>
        <Button type="submit" className="w-full">
          Filter jobs
        </Button>
      </form>
    </aside>
  );
};

export default FilterSidebar;
