import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { shopifyRequest } from "../../../../utils/shopify";
import { CUSTOMER_CREATE, CUSTOMER_LOGIN } from "../../../../queries/customer";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          // Check if customer exists in Shopify or create new one
          const email = user.email;
          const firstName = user.name?.split(" ")[0] || "User";
          const lastName = user.name?.split(" ").slice(1).join(" ") || "";

          // Try to create customer (will fail if exists)
          const randomPassword = Math.random().toString(36).slice(-12) + "Aa1!";

          try {
            await shopifyRequest(CUSTOMER_CREATE, {
              input: {
                email,
                password: randomPassword,
                firstName,
                lastName,
              },
            });
          } catch (error) {
            // Customer might already exist, that's okay
            console.log("Customer might already exist:", error.message);
          }

          return true;
        } catch (error) {
          console.error("Error creating Shopify customer:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, user }) {
      // Store user info in token
      if (account && user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      // Make user info available in session
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  debug: true, // Enable debug logs

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
