// src/app/layout.tsx
"use server";

import "./globals.css";
import { Providers } from "@/components/Providers";
import * as React from "react";
import { authClient } from "@/lib/AuthClient"
import Navigation from "@/components/navigation/navigation";

export default async function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await authClient.getSession()

  return (
    <html lang="de">
      <body>
        <Providers session={session}>
          <Navigation session={session}  />
          {children}
        </Providers>
      </body>
    </html>
  );
}
