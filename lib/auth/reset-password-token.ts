import prisma from "../db";

export const getResetpasswordTokenByEmail = async (email: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};
