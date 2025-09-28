import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import Typography from '@mui/material/Typography'

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/signin")
    }

    return (
        <>
            <Typography variant="h1" color="initial">Profile</Typography>
        </>
    )
}