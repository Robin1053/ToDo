import type { Metadata } from "next";
import { Sour_Gummy, Pacifico, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";

const geistSans = Roboto({
  subsets: ["latin"],
  variable: "--geist-sans",
});

const geistMono = Sour_Gummy({
  subsets: ["latin"],
  variable: "--geist-mono",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--pacifico",
  weight: "400"
});
export const metadata: Metadata = {
  title: "Todo App",
  description: "An simple todo application built with Next.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased p-2`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
