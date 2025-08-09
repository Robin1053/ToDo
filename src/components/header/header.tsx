"use client";

import * as React from "react";
import ProfileMenu from "@/components/header/ProfileMenu";
import HeaderLogo from "@/components/header/headerLogo";
import { Container, Toolbar, AppBar, Box, Button } from "@mui/material";

export default function Header() {
  const pages = ["Home", "ToDo", "Notes"];
  const settings = [/*"Profile", "Account", "Dashboard", "Logout"*/ "noch zu zu implimentieren"];


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header>
      <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HeaderLogo />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                  href={"/" + page.toLowerCase()}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <ProfileMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
