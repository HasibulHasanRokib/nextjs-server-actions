"use client";
import { approveJob, deleteJob } from "@/actions/adminAction";
import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";
import { useState } from "react";

function ApproveBtn({ jobId }: { jobId: string }) {
  const [error, setError] = useState<string | undefined>();
  return (
    <form
      action={async (formData) => {
        await approveJob(formData).then((data) => {
          return setError(data.error);
        });
      }}
    >
      <input hidden name="jobId" value={jobId} />
      <Button type="submit" variant={"secondary"}>
        Approve
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}

function DeleteBtn({ jobId }: { jobId: string }) {
  return (
    <form
      action={async (formData) => {
        await deleteJob(formData).then((data) => {
          return alert(data.error);
        });
      }}
    >
      <input hidden name="jobId" value={jobId} />
      <Button variant={"destructive"} type="submit">
        Delete
      </Button>
    </form>
  );
}

export default function AdminBtn({ job }: { job: Job }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {job.approved ? (
        <p className="font-semibold text-green-500">Approved</p>
      ) : (
        <ApproveBtn jobId={job.id} />
      )}
      <DeleteBtn jobId={job.id} />
    </div>
  );
}
