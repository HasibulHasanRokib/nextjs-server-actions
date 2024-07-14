import { z } from "zod";
import { jobTypes, locationType } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file ||
      (file instanceof File && file.type.startsWith("image/"),
      "Must be an image file"),
  )
  .refine(
    (file) => !file || file.size > 1024 * 1024 * 2,
    "File must be less than 2MB ",
  );

const applicationSchema = z
  .object({
    applicationEmail: z.string().email().optional().or(z.literal("")),
    applicationUrl: z.string().url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine((value) =>
      locationType.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type.",
    ),
    description: z.string().max(5000).optional(),
    companyName: requiredString.max(100),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 99 digits ",
    ),
    companyLogoUrl: companyLogoSchema,
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
