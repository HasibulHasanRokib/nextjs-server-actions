"use server";

import prisma from "@/lib/db";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const approveJob = async (formData: FormData) => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    if (!jobId) {
      return { error: "Job id not found!" };
    }

    const existJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existJob) {
      return { error: "Job not exist." };
    }

    await prisma.job.update({
      where: { id: existJob.id },
      data: {
        approved: true,
      },
    });
    revalidatePath("/");
    return { success: "Approved" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};

export const deleteJob = async (formData: FormData) => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    if (!jobId) {
      return { error: "Id not found" };
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
    return { error: "Something went wrong." };
  }
  redirect("/admin/dashboard");
};
