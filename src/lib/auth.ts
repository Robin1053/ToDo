import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { passkey } from "better-auth/plugins/passkey";
import { oneTap } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
    database: new Database("./src/lib/sqlite.db"),

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
