"use server";

import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/auth/user";
import { getVerificationTokenByToken } from "@/lib/auth/verification-token";

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist." };
  }
  const hasExpired = new Date(existingToken.expire) < new Date();
  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const userExist = await getUserByEmail(existingToken.email);
  if (!userExist) {
    return { error: "Email dose not exist." };
  }

  await prisma.user.update({
    where: {
      id: userExist.id,
    },
    data: {
      emailVerified: new Date(),
      email: userExist.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Account verified." };
};
