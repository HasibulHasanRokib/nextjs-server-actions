"use server";

import { currentUser } from "@/lib/auth/currentUser";
import prisma from "@/lib/db";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteJobByUser = async (formData: FormData) => {
  try {
    const jobId = formData.get("jobId") as string;
    if (!jobId) {
      return { error: "Id not found" };
    }
    const user = await currentUser();
    if (user?.role !== "USER") {
      return { error: "Only valid user can access this!" };
    }
    const existJob = await prisma.job.findUnique({
      where: { id: jobId },
    });
    if (!existJob) {
      return { error: "Job not exist." };
    }

    if (existJob.companyLogoUrl) {
      await del(existJob.companyLogoUrl);
    }
    await prisma.job.delete({
      where: { id: existJob.id },
    });
    revalidatePath("/");
  } catch (error) {
    return { error: "Something went wrong!" };
  }
  redirect("/user/profile");
};
