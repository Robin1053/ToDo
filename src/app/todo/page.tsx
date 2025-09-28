import ToDoComponent from "@/components/ToDo/ToDoComponent";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


export default async function ToDoPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return <>
    <ToDoComponent session={session}/>
    </>;
}