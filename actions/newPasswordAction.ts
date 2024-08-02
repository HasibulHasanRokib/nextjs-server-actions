"use server";

import { getResetPasswordTokenByToken } from "@/lib/auth/reset-password-token";
import { getUserByEmail } from "@/lib/auth/user";
import prisma from "@/lib/db";
import { NewPasswordSchema, TNewPasswordSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: TNewPasswordSchema,
  token: string,
) => {
  if (!token) {
    return { error: "Token not found!" };
  }

  const validationValue = NewPasswordSchema.safeParse(values);

  if (!validationValue.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword } = validationValue.data;

  if (password !== confirmPassword) {
    return { error: "Password not match!" };
  }

  const tokenExist = await getResetPasswordTokenByToken(token);

  if (!tokenExist) {
    return { error: "Token not exist!" };
  }

  const hasExpired = new Date(tokenExist.expire) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const userExist = await getUserByEmail(tokenExist.email);

  if (!userExist) {
    return { error: "User not exist!" };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  await prisma.user.update({
    where: { id: userExist.id },
    data: {
      password: hashPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: tokenExist.id },
  });

  return { success: "Successful." };
};
