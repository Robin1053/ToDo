import ToDoComponent from "@/components/ToDo/ToDoComponent";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ToDoPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const todos = await getTodos();

    async function getTodos() {
        const todos = await prisma.todo.findMany(
            {
                where: {
                    userId: session?.user.id
                }
                ,
                orderBy: {
                    createdAt: 'desc'
                }
            }
        );
        console.log(todos);
        return todos;
    }


    if (!session) { redirect("/auth/signin") }

    return (
        <>
            <ToDoComponent session={session} todos={todos} />
        </>
    );

}

