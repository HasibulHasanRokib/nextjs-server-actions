"use server";

import { signIn } from "@/auth";
import { sentEmailWithNodemailer } from "@/lib/auth/sentEmail";
import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/lib/auth/user";
import { signInSchema, TSignInSchema } from "@/lib/validation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values: TSignInSchema) {
  const validationValues = signInSchema.safeParse(values);

  if (!validationValues.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validationValues.data;

  const userExist = await getUserByEmail(email);
  if (!userExist || !userExist.email || !userExist.password) {
    return { error: "Email is not register." };
  }

  if (!userExist.emailVerified) {
    const generateToken = await generateVerificationToken(userExist.email);
    
    const emailData = {
      email,
      subject: "Verification email account.",
      html: `<h2>Hello ${userExist.name}</h2>
       <p>Please <a href="http://localhost:3000/active-account?token=${generateToken.token}">Click here</a> to verify your account</p>
      `,
    };

    await sentEmailWithNodemailer(emailData);
    return { success: "Email is not verified.Confirmation email is sent." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Sign in successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid credentials!" };
        case "CredentialsSignin":
          return { error: "CredentialsSignin error" };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
