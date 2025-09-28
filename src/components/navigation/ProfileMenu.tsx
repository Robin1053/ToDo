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
import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/auth-client";

export default function ProfileMenu({ session }: { session: Session | null }) {
  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu } =
    useMenuHandlers();

  // Falls Session vorhanden → Menü für "eingeloggt"
  if (session && session.user) {
    return (
      <Box sx={{ flexGrow: 0 }}>

        <Tooltip title="Open settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={
              {
                p: 0
              }
            }>
            <Avatar
              alt={session.user.name || "Guest"}
              src={session.user.image || "/imgs/guest_user.jpg"} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={
            {
              mt: "45px"
            }
          }
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={
            {
              vertical: "top",
              horizontal: "right",
            }
          }
          keepMounted
          transformOrigin={
            {
              vertical: "top",
              horizontal: "right",
            }
          }
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
              }
              } component="a"
              href={item.label === "Logout" ? undefined : item.url}

            >
              <Typography
                sx={
                  {
                    textAlign: "center"
                  }
                }>
                {item.label}
              </Typography>
            </MenuItem>
          )
          )
          }
        </Menu>
      </Box>
    );
  } else {

    // Falls User nicht eingeloggt → No Session-Menü
    return (
      <>
        <Box
          sx={
            {
              flexGrow: 0
            }
          }>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}
              sx={
                {
                  p: 0
                }
              }>
              <Avatar
                alt={"User"}
                src={"/imgs/guest_user.jpg"}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={
              {
                mt: "45px"
              }
            }
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={
              {
                vertical: "top",
                horizontal: "right",
              }
            }
            keepMounted
            transformOrigin={
              {
                vertical: "top",
                horizontal: "right",
              }
            }
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {MenuItemsNoSession.map((item) => (
              <MenuItem
                key={item.label}
                onClick={async () => {
                  handleCloseUserMenu();
                  if (item.label === "Logout") {
                    await authClient.signOut();
                  }
                }
                }
                component="a"
                href={item.url}
              >
                <Typography
                  sx={
                    {
                      textAlign: "center"
                    }
                  }>
                  {item.label}
                </Typography>
              </MenuItem>
            ))}

          </Menu>
        </Box>
      </>

    );
  }
}