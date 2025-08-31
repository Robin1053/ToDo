// src/components/NavMenu/Avatar.tsx (Server Component)
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Avatar from '@mui/material/Avatar';

export async function NavAvatar() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Prüfen, ob eine Sitzung vorhanden ist
    if (!session) {
        return <Avatar alt="Blank profile picture" src="/blank-profile-picture.svg" />;
    }
    
    // Wenn eine Sitzung vorhanden ist, verwenden Sie die Benutzerdaten
    const avatarSrc = session.user.image || "/blank-profile-picture.svg";
    const avatarAlt = session.user.name || "User Avatar"; // Ein Standardwert ist hier ebenfalls sinnvoll
    
    return <Avatar alt={avatarAlt} src={avatarSrc} />;
}