import { authClient } from "@/lib/auth-client"
import { navigationItems, HeaderMenuItemsSession, MenuItemsNoSession } from "@/config/navigation";
import { useMenuHandlers } from "@/hooks/useMenuHandlers";
import {
    Box,
    Button,
    MenuItem,
    Typography
} from "@mui/material"


export async function NavMenauPC() {
    const { data: session } = await authClient.getSession()
    const isLoggedIn = session?.user;

    const userMenuItems = isLoggedIn ? HeaderMenuItemsSession : MenuItemsNoSession;
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {navigationItems.map((item) => (
                    <Button
                        key={item.label}
                        component="a"
                        href={item.url}
                        sx={{
                            my: 2,
                            color: "black",
                            display: "block",
                            textDecoration: "none"
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>
        </>
    )
}

export async function NavMenauMobile() {
    const { data: session } = await authClient.getSession()
    const isLoggedIn = session?.user;


    const {
        handleCloseNavMenu,
    } = useMenuHandlers();



    return (
        <>
            <Box>
                {/* Mobile-Menüpunkte werden aus navigationItems gemappt */}
                {navigationItems.map((item) => (
                    <MenuItem key={item.label} onClick={handleCloseNavMenu} component="a" href={item.url}>
                        <Typography sx={{ textAlign: 'center' }}>{item.label}</Typography>
                    </MenuItem>
                ))}
            </Box>
        </>
    )
}

export async function UserMenu() {
    const { data: session } = await authClient.getSession()
    const isLoggedIn = session?.user;
    const userMenuItems = isLoggedIn ? HeaderMenuItemsSession : MenuItemsNoSession;
    const {
        handleCloseUserMenu,
    } = useMenuHandlers();
    return (
        <>
            {userMenuItems.map((item) => (
                <MenuItem key={item.label} onClick={handleCloseUserMenu} component="a" href={item.url}>
                    <Typography sx={{ textAlign: 'center' }}>{item.label}</Typography>
                </MenuItem>
            ))}
        </>
    )

}