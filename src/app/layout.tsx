import "./globals.css";
import { Providers } from "@/components/Providers";
import * as React from "react";
import Navigation from "@/components/navigation/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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
      <body>
        <Providers session={session}>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
