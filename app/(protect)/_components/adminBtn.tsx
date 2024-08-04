"use client";
import { approveJob, deleteJob } from "@/actions/adminAction";
import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ApproveBtn({ jobId }: { jobId: number }) {
  const [error, setError] = useState<string | undefined>();
  return (
    <form
      action={async (jobId) => {
        await approveJob(jobId).then((data) => {
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

function DeleteBtn({ jobId }: { jobId: number }) {
  return (
    <form
      action={async (jobId) => {
        await deleteJob(jobId);
      }}
    >
      <input hidden name="jobId" value={jobId} />
      <AlertDialog>
        <AlertDialogTrigger className="h-10 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button type="submit">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* // <Button type="submit" variant={"destructive"}>
      //   Delete
      // </Button> */}
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
