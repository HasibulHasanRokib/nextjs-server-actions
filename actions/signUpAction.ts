"use server";

import prisma from "@/lib/db";
import { sentEmailWithNodemailer } from "@/lib/auth/sentEmail";
import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/lib/auth/user";
import { SignUpSchema, TSignUpSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export const register = async (values: TSignUpSchema) => {
  const validationValue = SignUpSchema.safeParse(values);

  if (!validationValue.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validationValue.data;

  const userExist = await getUserByEmail(email);

  if (userExist) {
    return { error: "Email already register." };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  const emailData = {
    email,
    subject: "Verification email account.",
    html: `<h2>Hello ${newUser.name}</h2>
     <p>Please <a href="http://localhost:3000/active-account?token=${verificationToken.token}">Click here</a> to verify your account</p>
    `,
  };

  await sentEmailWithNodemailer(emailData);

  return { success: "Confirmation email sent!" };
};
