"use client";

import * as React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography, Box, IconButton, MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { pages } from "@/config/navigation";
import { useMenuHandlers } from "@/hooks/useMenuHandlers";

export default function HeaderLogo() {
  const {
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
  } = useMenuHandlers();

  const getPageUrl = (page: string) => {
    return page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase()}`;
  };

  return (
    <>
      {/* Desktop Logo */}
      <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>

      {/* Mobile Menu Button */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography 
                component="a" 
                href={getPageUrl(page)}
                sx={{ 
                  textAlign: "center",
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%"
                }}
              >
                {page}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Mobile Logo */}
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
    </>
  );
}