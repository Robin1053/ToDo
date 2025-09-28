import ToDoComponent from "@/components/ToDo/ToDoComponent";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function ToDoPage() {
    const todos = await getTodos();
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/auth/signin")
    }

    return (
        <>
            <ToDoComponent session={session} todos={todos} />
        </>
    );
}

async function getTodos() {
    const todos = await prisma.todo.findMany();
    console.log(todos);
    return todos;
}