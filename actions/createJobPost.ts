"use server";
import { setSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/currentUser";

export async function createJobPost(formData: FormData) {
  const result = Object.fromEntries(formData.entries());

  const {
    title,
    description,
    companyName,
    companyLogoUrl,
    applicationEmail,
    applicationUrl,
    locationType,
    location,
    type,
    salary,
  } = createJobSchema.parse(result);

  const slug = `${setSlug(title)}-${nanoid(10)}`;
  let companyLogo: string | undefined = undefined;

  if (companyLogoUrl) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogoUrl.name)}`,
      companyLogoUrl,
      {
        access: "public",
        addRandomSuffix: false,
        token,
      },
    );
    companyLogo = blob.url;
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Not authorized!" };
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl: companyLogo,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary, 10),
      userId: user.id,
    },
  });

  redirect("/jobs/new");
}
