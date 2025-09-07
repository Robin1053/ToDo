// src/components/NavMenu/SignIn.tsx
"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  CardContent,
  Card,
  CardHeader,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Divider,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { authClient } from '@/lib/auth-client';
import dayjs from 'dayjs';


export default function SignUp() {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [Image, setImage] = useState('https://mui.com/static/images/avatar/1.jpg');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const handleEmailSignUp = async (event: React.FormEvent) => {

    event.preventDefault();
    // Ihre E-Mail-Registrirungs-Logik hier
    console.log("E-Mail-Registrierung wurde geklickt.");

    if (!email || !password) {
      console.error("E-Mail oder Passwort fehlt.");
      setErrorMessage("E-Mail oder Passwort fehlt.")
      return;
    }
    try {
      const { data, error } = await authClient.signUp.email({
        name: name, // required
        email: email, // required
        password: password, // required
        image: Image, // optional
        Birthday: Birthday
      });

      console.log(`Versuche, mit E-Mail ${email} und Passwort registriren...`);
      if (error) {
        console.error("Fehler bei der E-Mail-Registrierung:", error);
        setErrorMessage("Fehler bei der E-Mail-Registrierung: " + error.message)
      } else {
        console.log("E-Mail-Registrierung erfolgreich!", data);
      }
    } catch (err) {
      setErrorMessage("Unerwarteter Fehler bei der E-Mail-Registrierung.");
      console.error("Unerwarteter Fehler bei der E-Mail-Registrierung:", err);
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 440, mx: 'auto', mt: 8, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <CardHeader
            title="Please Sign Up"
          /></Box>
        <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Formular-Container, um die Elemente vertikal zu stapeln */}
          {errorMessage && (
            <Alert
              severity="error"
              sx={
                {
                  width: 300,
                  minHeight: 48,
                  mb: 2, // Abstand nach unten hinzufügen
                }
              }>
              {errorMessage}
            </Alert>
          )}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2, // Abstand zwischen den Formular-Elementen
            }}
            method='post'
            onSubmit={handleEmailSignUp}
          >
            <TextField
              style={{ width: 300 }}
              id="name"
              label="Max Mustermann"
              variant="standard"
              name='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)} // onChange-Handler hinzugefügt
            />
            <TextField
              style={{ width: 300 }}
              id="email"
              label="Max@Musterman.de"
              variant="standard"
              name='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // onChange-Handler hinzugefügt
            />

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
            <FormControl sx={{ width: 300 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password Wiederholen</InputLabel>
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

            <DatePicker
              value={Birthday}
              onChange={(newValue) => setBirthday(newValue)}
              maxDate={yesterday}
              defaultValue={yesterday}
              label="Birthday"
              sx={{ width: 300 }}

            />
            <FormControlLabel required control={<Checkbox />} label="Bitte akzeptieren Sie die AGB" />


            {/* Container für die Buttons, um sie nebeneinander zu platzieren */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: 300 }}>
              <Button variant="contained" color="primary" type='submit' sx={{
                flexGrow: 1,
                minHeight: '48px',
                '@media (max-width: 600px)': {
                  width: '100%',
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