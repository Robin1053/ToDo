"use client"
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
    Paper
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Padding } from "@mui/icons-material";

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

    return (
        <Paper elevation={3} sx={{marginTop:5}} style={{justifyContent:"center"}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <Paper elevation={1} sx={{margin:2}} key={"PW"}>
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.includes(value)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                </ListItemButton>
                            </ListItem>
                        </Paper>
                    );
                })}
            </List>
        </Paper>
    );
}