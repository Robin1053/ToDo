import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { oneTapClient, passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scopes: ["https://www.googleapis.com/auth/user.birthday.read", "profile", "email"],
    },
  },
  plugins: [
    passkeyClient(),
    oneTapClient({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      autoSelect: true,
      cancelOnTapOutside: true,
      context: "use",
      additionalOptions: {},
      promptOptions: {
        baseDelay: 20,
        maxAttempts: 5,
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
export type Session = typeof authClient.$Infer.Session
