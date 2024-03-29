import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Adapters from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
