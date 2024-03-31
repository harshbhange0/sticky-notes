import { CreateUser, inputData } from "@/helpers/user";
import { authOptions } from "@/lib/auth.config";
import NextAuth from "next-auth";

const handler = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (token && token.email) {
        const data: inputData = {
          email: token.email!,
          name: token.name!,
          image: token.picture!,
        };
        const user = await CreateUser(data);
        if (user) {
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (session && session.user && token) {
        const data: inputData = {
          email: token.email!,
          name: token.name!,
          image: token.picture!,
        };
        const user = await CreateUser(data);
        if (user) {
          session.user.id = user.id;
        }
      }

      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },
  ...authOptions,
});

export { handler as GET, handler as POST };
