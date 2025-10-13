import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { Typography } from '@mui/material'
import ProfileDetails from "@/components/ProfileDetails";


export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth/signin")
    }

    return (
        <>
            <Typography
                variant="h1"
                color="initial"
                sx={
                    {
                        justifyContent: 'center',
                        display: 'flex',
                        marginTop: '20px',
                        marginBottom: '20px',
                        fontFamily: 'Sour Gummy, Roboto, sans-serif',
                    }
                }>Profile</Typography>
            <ProfileDetails session={session} />
        </>
    )
}