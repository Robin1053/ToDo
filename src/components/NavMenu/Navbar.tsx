"use client"

import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { navigationItems, HeaderMenuItemsSession, MenuItemsNoSession } from "@/config/navigation";
import { useMenuHandlers } from "@/hooks/useMenuHandlers";


type NavbarProps = {
    avatar: React.ReactNode;
}


// Hier simulieren wir den Anmeldestatus.
// In einer echten App würde dieser Wert aus einem globalen State oder Context kommen.
const isLoggedIn = false;

export default function Navbar({ avatar }: NavbarProps) {
    // Dynamische Bestimmung der Menüpunkte basierend auf dem Anmeldestatus
    const userMenuItems = isLoggedIn ? HeaderMenuItemsSession : MenuItemsNoSession;
    
    const {
        anchorElUser,
        handleOpenUserMenu,
        handleCloseUserMenu,
        anchorElNav,
        handleOpenNavMenu,
        handleCloseNavMenu,
    } = useMenuHandlers();
    
    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* LOGO - Desktop */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Navigationsmenü - Mobile Ansicht */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {/* Mobile-Menüpunkte werden aus navigationItems gemappt */}
                            {navigationItems.map((item) => (
                                <MenuItem key={item.label} onClick={handleCloseNavMenu} component="a" href={item.url}>
                                    <Typography sx={{ textAlign: 'center' }}>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    
                    {/* LOGO - Mobile Ansicht */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Navigationsleiste - Desktop Ansicht */}
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

                    {/* Benutzermenü */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {avatar}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* Das Benutzermenü zeigt jetzt dynamisch die Menüpunkte an */}
                            {userMenuItems.map((item) => (
                                <MenuItem key={item.label} onClick={handleCloseUserMenu} component="a" href={item.url}>
                                    <Typography sx={{ textAlign: 'center' }}>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}