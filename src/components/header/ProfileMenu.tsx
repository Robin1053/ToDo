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
import { SettingsNoSession } from "@/config/navigation";
import { useMenuHandlers } from "@/hooks/useMenuHandlers";
import { HeaderMenuItemsSession } from "@/config/navigation";


export default function ProfileMenu() {

  const getPageUrl = (HeaderMenuItemsSession: string) => {
    return HeaderMenuItemsSession.toLowerCase();

  };

  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
  } = useMenuHandlers();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" />
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
        {SettingsNoSession.map((setting: string) => (
          <MenuItem
            key={setting}
            onClick={handleCloseUserMenu}
            component="a"
            href={`/auth/${setting.toLowerCase()}`}>
            <Typography
              sx={{ textAlign: "center" }}>{setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}