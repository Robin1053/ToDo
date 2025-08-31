// src/components/NavMenu/SignIn.tsx
"use client";

import * as React from 'react';
import {
  Typography,
  CardContent,
  Card,
  CardHeader,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Checkbox,
  Button,
  FormControlLabel,
  Divider,
  Box, // Importiert, um die Buttons zu gruppieren
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Card sx={{ maxWidth: 440, mx: 'auto', mt: 8, display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title="Please Sign In"
        />
        <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Formular-Container, um die Elemente vertikal zu stapeln */}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2, // Abstand zwischen den Formular-Elementen
            }}
            method='post'
            action='/sign-in/email'
          >
            <TextField style={{ width: 300 }} id="email" label="Max@Musterman.de" variant="standard" name='email' required />

            <FormControl sx={{ width: 300 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide password' : 'display password'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <DatePicker label="Birthday" sx={{ width: 300 }} />


            {/* Container für die Buttons, um sie nebeneinander zu platzieren */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: 300 }}>
              <Button variant="contained" color="primary" type='submit' sx={{
                flexGrow: 1,
                minHeight: '48px', // Mindesthöhe für bessere Bedienbarkeit
                // Breite des Buttons auf mobilen Geräten anpassen
                '@media (max-width: 600px)': {
                  width: '100%', // Füllt die gesamte Breite des Containers aus
                },
              }}>
                Sign Up
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                href='/auth/signin'
                sx={{
                  flexGrow: 1,
                  minHeight: '48px', // Mindesthöhe beibehalten
                  '@media (max-width: 600px)': {
                    width: '100%',
                  },
                }}>
                Sign In
              </Button>
            </Box>
          </Box>
          <Divider sx={{ my: 3, width: 300 }}>Or Sign Up with</Divider>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signup_with"
            data-size="large"
            data-logo_alignment="left"
            data-width="280">
          </div>
        </CardContent>
      </Card >
    </>
  );
}