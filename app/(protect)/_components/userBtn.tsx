import { deleteJobByUser } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";

function DeleteJobByUser({ jobId }: { jobId: string }) {
  return (
    <form
      action={async (formData) => {
        "use server";
        await deleteJobByUser(formData);
      }}
    >
      <input type="text" hidden name="jobId" value={jobId} />
      <Button variant={"destructive"} type="submit">
        Delete
      </Button>
    </form>
  );
}

export default function UserBtn({ job }: { job: Job }) {
  return (
    <div className="flex items-center gap-2">
      {job.approved ? (
        <p className="font-semibold text-green-500">Approved</p>
      ) : (
        <p className="font-semibold text-sky-500">Pending...</p>
      )}
      <DeleteJobByUser jobId={job.id} />
    </div>
  );
}
