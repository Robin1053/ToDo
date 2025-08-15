"use client";
import * as React from "react";
import {
  Box,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Paper,
  Fab,
  TextField
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Delete, Padding, Add } from "@mui/icons-material";

export function ToDo() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (checked.length === 1) {
    console.log("test");
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{ marginTop: 5 }}
        style={{ justifyContent: "center" }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <Paper elevation={1} sx={{ margin: 2 }} key={"PW"}>
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <Delete />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon sx={{ minWidth: 40, maxWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(value)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                  <TextField
                    id={labelId}
                    label="Helper text"
                    defaultValue="Default Value"
                    variant="standard"
                  />
                </ListItem>
              </Paper>
            );
          })}
        </List>
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>
    </>
  );
}
