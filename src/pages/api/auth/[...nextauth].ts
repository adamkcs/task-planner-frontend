import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/services/api"; // Use our central API

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const res = await axios.post("/auth/login", credentials);
          return res.data.user; // Return user data from .NET
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      },
  },
});