"use client";

import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import pages from "@/components/header/header";
import settings  from "@/components/header/header";
import handleOpenUserMenu from "@/components/header/header";
import handleCloseNavMenu from "@/components/header/header";
import handleCloseUserMenu from "@/components/header/header";
import handleOpenNavMenu from "@/components/header/header";
import anchorElUser from "@/components/header/header";


export default function ProfileMenu() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
    );
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" />
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
          {settings.map((setting: string) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}
}
