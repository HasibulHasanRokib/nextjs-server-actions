import React from "react";
import NewJobForm from "./NewJobForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CreateJob() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div>
      <NewJobForm />
    </div>
  );
}
