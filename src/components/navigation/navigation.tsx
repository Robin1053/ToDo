import { pages } from "@/config/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <NavigationClient session={session} pages={pages} />;
}