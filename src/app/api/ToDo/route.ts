import { NextResponse } from "next/server";
import { prisma       } from "@/lib/prisma";
import { auth         } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title: body.title ?? "New Todo",
      completed: false,
      userId: session.user.id,
    },
  });

  return NextResponse.json(todo);
}

export async function PUT(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const todo = await prisma.todo.update({
    where: { id: body.id },
    data: {
      title: body.title,
      completed: body.completed,
      userId: session.user.id,
    },
  });

  return NextResponse.json(todo);
}

export async function DELETE(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const todo = await prisma.todo.delete({
    where: { id: body.id },
  });
  return NextResponse.json(todo);
}
