"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
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
  Box,
  Alert,
  LinearProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyIcon from '@mui/icons-material/Key';
import { authClient } from '@/lib/auth-client';
import { jwtDecode } from "jwt-decode";



export default function SignIn() {

  console.log("Client ID geladen:", process.env.GOOGLE_CLIENT_ID);
  const [clientId, setClientId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  useEffect(() => {
    const handleCredentialResponse = async (response: any) => {
      const [Google_ID_Token] = response.credential.token();
      console.log("Encoded JWT ID token: " + response.credential);

      if (response.credential) {
        setLoading(true);
        console.log("Erfolgreich einloggt! Sende Token an Backend...");

        try {
          // Send the token to your backend API for verification and sign-in
          const apiResponse = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: response.credential }),
          });
          if (apiResponse.ok) {
            // Assuming your backend returns user data upon successful login
            const userData = await apiResponse.json();
            setUser(userData);
            console.log("Backend-Anmeldung erfolgreich!", userData);
          } else {
            console.error("Backend-Anmeldung fehlgeschlagen:", apiResponse.statusText);
            setUser(null);
          }

        } catch (error) {
          console.error("Fehler beim Senden des Tokens an das Backend:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }

      } else {
        console.error("Anmeldung fehlgeschlagen: Kein Token erhalten.");
        setUser(null);
      }
    };

    if (typeof window.google !== 'undefined') {
      window.handleCredentialResponse = handleCredentialResponse;

      // Initialisieren der Google-Anmeldung
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: window.handleCredentialResponse,
      });

      // Rendern des Anmeldebuttons
      const googleButton = document.getElementById("google-signin-button");
      if (googleButton) {
        window.google.accounts.id.renderButton(
          googleButton,
          {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "pill",
            text: "signin_with",
            logo_alignment: "left",
            width: 302,
          }
        );
      }

      // Zeigen Sie das One-Tap-Pop-up
      window.google.accounts.id.prompt();
    }
  },
  );

  const handleEmailSignIn = async (event: React.FormEvent) => {

    event.preventDefault();
    // Ihre E-Mail-Anmelde-Logik hier
    console.log("E-Mail-Anmeldung wurde geklickt.");

    if (!email || !password) {
      console.error("E-Mail oder Passwort fehlt.");
      setErrorMessage("E-Mail oder Passwort fehlt.")
      return;
    }
    try {
      const { data, error } = await authClient.signIn.email({
        email: email, // required
        password: password, // required
        rememberMe: rememberMe as boolean,
        callbackURL: "/",
      });
      console.log(`Versuche, mit E-Mail ${email} und Passwort anzumelden...`);
      if (error) {
        console.error("Fehler bei der E-Mail-Anmeldung:", error);
        setErrorMessage("Fehler bei der E-Mail-Anmeldung: " + error.message)
      } else {
        console.log("E-Mail-Anmeldung erfolgreich!", data);
      }
    } catch (err) {
      setErrorMessage("Unerwarteter Fehler bei der E-Mail-Anmeldung.");
      console.error("Unerwarteter Fehler bei der E-Mail-Anmeldung:", err);
    }
  }
  const handlePasskeySignIn = async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Passkey-Anmeldung wurde geklickt.");
    if (!email) {
      console.error("E-Mail-Adresse fehlt.");
      setErrorMessage("E-Mail is missing")
      return;
    }
    try {
      const { data, error } = await authClient.signIn.passkey({
        email: email,
        autoFill: true,
      });
      console.log(`Versuche, mit Passkey für E-Mail ${email} anzumelden...`);

      if (error) {
        console.error("Fehler bei der Passkey-Anmeldung:", error);
        setErrorMessage("Fehler bei der Passkey-Anmeldung" + error.message)
      } else {
        console.log("Passkey-Anmeldung erfolgreich!", data);
      }

    } catch (err) {
      setErrorMessage("Unerwarteter Fehler bei der Passkey-Anmeldung.");
      console.error("Unerwarteter Fehler bei der Passkey-Anmeldung:", err);
    }
  };

  return (
    <>
      <Card sx={
        {
          maxWidth: 440,
          mx: 'auto',
          mt: 8,
          display: 'flex',
          flexDirection: 'column'
        }
      }>
        <CardHeader
          title="Bitte melden Sie sich an"
        />
        <CardContent
          sx={
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }>
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
            onSubmit={handleEmailSignIn}
            sx={
              {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: 300
              }
            }
          >
            <TextField
              fullWidth id="email"
              label="Max@Musterman.de"
              variant="standard"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // onChange-Handler hinzugefügt
              required />
            <FormControl
              fullWidth
              variant="standard">
              <InputLabel
                htmlFor="password"
              >Passwort</InputLabel>
              <Input
                value={password}
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)} // onChange-Handler hinzugefügt
                endAdornment={
                  <InputAdornment
                    position="end">
                    <IconButton
                      aria-label={showPassword ? 'Passwort ausblenden' : 'Passwort anzeigen'}
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
            <Box sx={
              {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }
            }>
              <FormControlLabel
                control={
                  <Checkbox
                    id='rememberMe'
                    name='rememberMe'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} // onChange-Handler hinzugefügt
                  />
                }
                label="Angemeldet bleiben" />
              <Typography
                variant="body2"
                sx={
                  {
                    color: 'secondary',
                    textDecoration: 'underline dotted'
                  }
                }>
                <a href="/auth/forgotpassword">Passwort vergessen</a>
              </Typography>
            </Box>

            <Box
              sx={
                {
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2, width: '100%'
                }
              }>
              <Button
                variant="contained"
                color="primary"
                type='submit'
                sx={
                  {
                    flexGrow: 1,
                    minHeight: '48px',
                  }
                }>
                Anmelden
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                href='/auth/signup'
                sx={
                  {
                    flexGrow: 1,
                    minHeight: '48px',
                  }
                }>
                Registrieren
              </Button>
            </Box>
          </Box>
          {loading && (
            <LinearProgress
              style={
                {
                  width: 300,
                  marginTop: 3,
                  marginBottom: 3
                }
              }
            />

          )}
          {!loading && (
            <Divider
              sx={
                {
                  my: 3,
                  width: 300
                }
              }>Oder melden Sie sich an mit
            </Divider>
          )}
          <Box
            sx={
              {
                gap: 2,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }
            }>


            <div
              id="google-signin-button"
              style={
                {
                  minHeight: 48
                }
              }>

            </div>

            <Button
              variant='outlined'
              onClick={handlePasskeySignIn}
              startIcon={<KeyIcon />}
              sx={
                {
                  width: 300,
                  minHeight: 48
                }
              }
            >
              Oder mit Passkey anmelden
            </Button>
          </Box>
        </CardContent>
      </Card >
    </>
  )
}
