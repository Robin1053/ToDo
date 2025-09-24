"use client";

import * as React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import { MenuItemsNoSession, HeaderMenuItemsSession } from "@/config/navigation";
import { useMenuHandlers } from "@/hooks/useMenuHandlers";
import { authClient } from "@/lib/AuthClient";
import type { Session } from "@/lib/AuthClient";

export default function ProfileMenu({ session }: { session: Session | null }) {
  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } =
    useMenuHandlers();

  // Falls keine Session vorhanden → Menü für "nicht eingeloggt"
  if (!session?.user) {
    return (
      <Box sx={{ flexGrow: 0 }}>

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Guest" src="/imgs/guest_user.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {MenuItemsNoSession.map((item) => (
            <MenuItem
              key={item.label}
              onClick={handleCloseUserMenu}
              component="a"
              href={item.url}
            >
              <Typography sx={{ textAlign: "center" }}>{item.label}</Typography>
            </MenuItem>
          ))}

        </Menu>
      </Box>
    );
  }

  // Falls User eingeloggt → Session-Menü
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={session.user?.name || "User"}
            src={session.user?.image || "public/images/broken_user.jpg"}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {HeaderMenuItemsSession.map((item) => (
          <MenuItem
            key={item.label}
            onClick={async () => {
              handleCloseUserMenu();
              if (item.label === "Logout") {
                await authClient.signOut();
              }
            }}
            component="a"
            href={item.label === "Logout" ? undefined : item.url}
          >
            <Typography sx={{ textAlign: "center" }}>{item.label}</Typography>
          </MenuItem>
        ))}

      </Menu>
    </Box>
  );
}