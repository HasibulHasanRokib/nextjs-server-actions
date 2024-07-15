"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createJobSchema, CreateJobValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes, locationType } from "@/lib/job-types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitBtn from "@/components/SubmitBtn";

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const submit = (values: CreateJobValues) => {
    console.log(values);
  };

  return (
    <main className="mx-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-bold">Find your perfect developer</h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 rounded-md border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g.Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comapny</FormLabel>
                    <FormControl>
                      <Input placeholder="company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyLogoUrl"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Company logo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...fieldValues}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {locationType.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Dhaka,Bangladesh"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <Label htmlFor="applicationEmail">How to apply</Label>
                <div className="flex items-center justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="applicationEmail"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <Input
                            id="applicationEmail"
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p>or</p>
                  <FormField
                    control={form.control}
                    name="applicationUrl"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormControl>
                          <Input
                            id="applicationUrl"
                            type="url"
                            placeholder="Website"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your description here."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitBtn title="Post job" />
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
