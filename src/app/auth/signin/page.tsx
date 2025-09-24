import React from 'react';

<<<<<<< HEAD
export default function Signin() {
    return (
        <>
        </>
    );
=======
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

const { data: session } = await authClient.getSession()



export default function SignIn() {

  console.log("Client ID geladen:", process.env.GOOGLE_CLIENT_ID);
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
    const handleCredentialResponse = async (response: CredentialResponse) => {
      // You probably want to use response.credential directly, not response.credential.token()
      console.log("Encoded JWT ID token: " + response.credential);

      if (response.credential) {
        setLoading(true);
        console.log("Erfolgreich einloggt! Sende Token an Backend...");

        try {
          // Send the token to your backend API for verification and sign-in
          const apiResponse  = await authClient.signIn.social({
            provider: "google",
            idToken: {
              token: response.credential,
            }
          })
            ;
        } finally {
          setLoading(false);
        }
      }
    };

    if (typeof window !== 'undefined' && typeof window.google !== 'undefined') {
      // Attach handler to window so Google can call it
      (window).handleCredentialResponse = handleCredentialResponse;

      // Initialisieren der Google-Anmeldung
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: (window).handleCredentialResponse,
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
  }, []);

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
>>>>>>> 76254e04de58e77c7b17cee04b42203ab5f7bff2
}
