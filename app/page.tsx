import FilterSidebar from "@/components/FilterSidebar";
import JobResult from "@/components/JobResult";
import { jobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface pageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}
function getTitle({ q, type, location, remote }: jobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? `in ${location}` : "";
  return `${titlePrefix} ${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, remote, location },
}: pageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })}| Flow jobs`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: pageProps) {
  const filterValues: jobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValues)}
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-2 md:flex-row">
        <FilterSidebar defaultValues={filterValues} />
        <JobResult
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
