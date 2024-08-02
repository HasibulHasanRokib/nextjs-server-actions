import { v4 as uuidv4 } from "uuid";

import prisma from "../db";
import { getVerificationTokenByEmail } from "./verification-token";
import { getResetpasswordTokenByEmail } from "./reset-password-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getVerificationTokenByEmail(email);
  if (existToken) {
    await prisma.verificationToken.delete({
      where: { id: existToken.id },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 360 * 1000);

  const existToken = await getResetpasswordTokenByEmail(email);
  if (existToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existToken.id },
    });
  }
  const generateResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return generateResetToken;
};
