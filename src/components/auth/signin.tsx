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
import { authClient, Session, signIn } from '@/lib/auth-client';
import SvgIcon from '@mui/material/SvgIcon';



interface ProvidersProps {
    session: Session | null;
}

export default function SigninComponent({ session }: ProvidersProps) {
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


    const handleEmailSignIn = async (event: React.FormEvent) => {

        event.preventDefault();
        // Ihre E-Mail-Anmelde-Logik hier
        console.log("E-Mail Registrierung was clicked.");

        if (!email || !password) {
            console.error("E-Mail or Password is missing.");
            setErrorMessage("E-Mail or Password is missing.");
            return;
        }
        try {
            const { data, error } = await authClient.signIn.email({
                email: email, // required
                password: password, // required
                rememberMe: rememberMe as boolean,
                callbackURL: "/",
            });
            console.log(`trying to sign in with ${email}...`);
            if (error) {
                console.error("Error signing in with email:", error);
                setErrorMessage("Error signing in with email: " + error.message)
            } else {
                console.log("Email sign-in successful!", data);
            }
        } catch (err) {
            setErrorMessage("Unexpected error signing in with email." + err);
            console.error("Unexpected error signing in with email:", err);
        }
    }
    const handlePasskeySignIn = async (event: React.MouseEvent) => {
        event.preventDefault();
        console.log(`trying to sign in with passkey ...`);

        await authClient.signIn.passkey({
            autoFill: false,
            fetchOptions: {
                onSuccess(context) {
                    window.location.href = "/dashboard";
                },
                onError(context) {
                    // Handle authentication errors
                    console.error("Authentication failed:", context.error.message);
                    setErrorMessage("Authentication failed: " + context.error.message);
                }
            }
        });
    }


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


                        <Button
                            variant='outlined'
                            onClick={handlePasskeySignIn}
                            startIcon={<KeyIcon />}
                            sx={
                                {
                                    width: 300,
                                    minHeight: 48,
                                    font: 'Roboto',
                                }
                            }
                        >
                            Oder mit Passkey anmelden
                        </Button>
                        {<Button
                            startIcon={<SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>

                                </svg>
                            </SvgIcon>}
                            variant="outlined"
                            color="primary"
                            sx={
                                {
                                    width: 300,
                                    minHeight: 48,
                                    font: 'Roboto',
                                }
                            } disabled={loading}
                            onClick={async () => {
                                await signIn.social(
                                    {
                                        provider: "google",
                                        callbackURL: "/dashboard"
                                    },
                                    {
                                        onRequest: (ctx) => {
                                            setLoading(true);
                                        },
                                        onResponse: (ctx) => {
                                            setLoading(false);
                                        },
                                    },
                                );
                            }}
                        >
                            Mit Google anmelden
                        </Button>}
                    </Box>
                </CardContent>
            </Card >
        </>
    );
}
