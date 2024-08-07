import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/auth/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const validateValues = signInSchema.safeParse(credentials);
        if (validateValues.success) {
          const { email, password } = validateValues.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;
          const passOk = await bcrypt.compareSync(password, user.password);

          if (passOk) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
