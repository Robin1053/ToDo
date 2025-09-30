import "./globals.css";
import { Providers } from "@/components/Providers";
import * as React from "react";
import Navigation from "@/components/navigation/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  console.log("Session aus Better Auth:", session);

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&family=Sour+Gummy:ital,wdth,wght@0,100..125,100..900;1,100..125,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers session={session}>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
