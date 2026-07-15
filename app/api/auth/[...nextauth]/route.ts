// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const clientId = process.env.COGNITO_CLIENT_ID!;
const region = process.env.COGNITO_REGION ?? "us-east-1";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "POLYFORGE",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = new CognitoIdentityProviderClient({ region });
        
        try {
          const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
              USERNAME: credentials.email,
              PASSWORD: credentials.password,
            },
            ClientId: clientId,
          });

          const response = await client.send(command);

          if (response.AuthenticationResult) {
            // Decode the ID token to get the user's details
            const idToken = response.AuthenticationResult.IdToken;
            if (!idToken) return null;
            
            // Simple base64 decode for the payload
            const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());

            return {
              id: payload.sub,
              name: payload.name || payload.email,
              email: payload.email,
            };
          }
          return null;
        } catch (error) {
          console.error("Cognito Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "";
      }
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
