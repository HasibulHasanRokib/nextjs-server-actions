import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/validation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null;
        const { email, password } = await signInSchema.parseAsync(credentials);
        user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) throw new CredentialsSignin("User not found.");
        const passOk = bcrypt.compare(user.password, password);
        if (!passOk) throw new CredentialsSignin("Invalid credentials.");

        return {
          name: user.userName,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //1d
  },

  pages: {
    signIn: "/sign-in",
  },
});
