import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {

        const userData = await prisma.user.findFirst({
          where : {
            email : user.email!
          }

        })
        if(userData) return true;
          await prisma.user.create({
            data: {
              email: user.email!,
            },
          });
          return true;
        }
       catch (err) {
        console.error("SignIn Error:", err);
        return false;
      }
    },

}
});

export { handler as GET, handler as POST };
