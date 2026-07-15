// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";

const userPoolId = process.env.COGNITO_USER_POOL_ID!;
const region = process.env.COGNITO_REGION ?? "us-east-1";
const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "cognito",
      name: "POLYFORGE",
      type: "oauth",
      wellKnown: `${issuer}/.well-known/openid-configuration`,
      clientId: process.env.COGNITO_CLIENT_ID!,
      checks: ["pkce", "state"],
      authorization: {
        params: {
          scope: "openid email profile",
          response_type: "code",
        },
      },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.email,
          email: profile.email,
          image: profile.picture ?? null,
        };
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
