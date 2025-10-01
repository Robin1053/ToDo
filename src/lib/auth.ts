import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins/passkey";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),

  user: {
    additionalFields: {
      Birthday: {
        type: "date",
        input: true,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {

    //TODO: Profil-pic fixen
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scopes: [
        "https://www.googleapis.com/auth/user.birthday.read",
        "openid",
        "profile",
        "email"
      ],
    },
  },

  plugins: [passkey(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
