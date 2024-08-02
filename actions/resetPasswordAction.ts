"use server";

import { sentEmailWithNodemailer } from "@/lib/auth/sentEmail";
import { generateResetPasswordToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/lib/auth/user";
import { ForgetPasswordSchema, TForgetPasswordSchema } from "@/lib/validation";

export const resetPassword = async (values: TForgetPasswordSchema) => {
  const validateValue = ForgetPasswordSchema.safeParse(values);

  if (!validateValue.success) {
    return { error: "Invalid field!" };
  }
  const { email } = validateValue.data;

  const userExist = await getUserByEmail(email);

  if (!userExist) {
    return { error: "Email not found!" };
  }

  const generateToken = await generateResetPasswordToken(userExist.email);

  const emailData = {
    email,
    subject: "Reset password.",
    html: `<h2>Hello ${userExist.name}</h2>
   <p>Please <a href="http://localhost:3000/new-password?token=${generateToken.token}">Click here</a> to reset your password.</p>
  `,
  };

  await sentEmailWithNodemailer(emailData);
  return { success: "Email sent!" };
};
