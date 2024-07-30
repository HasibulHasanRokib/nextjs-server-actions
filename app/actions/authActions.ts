"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { signInSchema, SignUpSchema, TSignInSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const result = Object.fromEntries(formData.entries());
  console.log(result);
  const { userName, password, email } = SignUpSchema.parse(result);

  const userExist = await prisma.user.findUnique({
    where: { email },
  });
  if (userExist) throw "This email already register.";
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  await prisma.user.create({
    data: {
      userName,
      email,
      password: hashPassword,
    },
  });
  redirect("/sign-in");
}

export async function credentialsSignIn(formData: FormData) {
  const result = Object.fromEntries(formData.entries());
  console.log("Server:", result);
  const { email, password } = signInSchema.parse(result);
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }
}
