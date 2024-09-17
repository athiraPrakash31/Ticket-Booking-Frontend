import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id to the user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user id to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string; // Ensure id is set in session.user
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
