import React from 'react';
import { Box, Typography } from '@mui/material';
export default function ForgotPasswordPage() {
    return (
        <>
            <Box
                sx={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: "100vh"
                    }
                }
            >
                <Typography
                    variant="h1">
                    Passwort vergessen
                </Typography>
            </Box>
        </>
    );
}