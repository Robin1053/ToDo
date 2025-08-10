"use client";
import React, { useState } from "react";
import { TextField, Paper, List, ListItem, ListItemButton, ListItemIcon, Checkbox } from "@mui/material";


export default function Todo() {
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
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem>
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon >
                                    <Checkbox
                                        edge="start"
                                        checked={checked.includes(value)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>

                            </ListItemButton>
                            <TextField id="standard-basic" label="Standard" variant="standard" />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}