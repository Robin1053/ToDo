import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return Response.json({ name, email });
}
