import FilterSidebar from "@/components/FilterSidebar";
import JobResult from "@/components/JobResult";
import { jobFilterValues } from "@/lib/validation";

interface pageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
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
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-2 md:flex-row">
        <FilterSidebar defaultValues={filterValues} />
        <JobResult filterValues={filterValues} />
      </section>
    </main>
  );
}
