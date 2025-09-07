import { betterAuth } from "better-auth";
import { passkey } from "better-auth/plugins/passkey";
import { oneTap } from "better-auth/plugins";
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
              input: true
            } 
        }
    },


  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [
    passkey(),
    oneTap(), // Add the One Tap server plugin
    nextCookies(),
  ],
});
