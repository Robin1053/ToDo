"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
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
import {
    authClient,
    Session,
    signIn
} from '@/lib/auth-client';
import SvgIcon from '@mui/material/SvgIcon';

interface ProvidersProps {
    session: Session | null;
}

export default function SigninComponent({ session }: ProvidersProps) {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        console.log("Component mounted!");
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div>Loading...</div>;
    }

    const handleClickShowPassword = () => { setShowPassword((show) => !show); };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    };

    const handleEmailSignIn = async () => {
        console.log("=== SIGN IN CLICKED ===");
        console.log("Email:", email);
        console.log("Password length:", password.length);

        setLoading(true);
        setErrorMessage('');

        if (!email || !password) {
            console.error("E-Mail or Password is missing.");
            setErrorMessage("E-Mail oder Passwort fehlt.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.signIn.email({
                email: email,
                password: password,
                rememberMe: rememberMe,
                callbackURL: "/",
            });

            console.log(`Trying to sign in with ${email}...`);

            if (error) {
                console.error("Error signing in with email:", error);
                setErrorMessage("Fehler beim Anmelden: " + error.message);
                setLoading(false);
            } else {
                console.log("Email sign-in successful!", data);
                setLoading(false);
            }
        } catch (err) {
            setErrorMessage("Unerwarteter Fehler beim Anmelden: " + err);
            console.error("Unexpected error signing in with email:", err);
            setLoading(false);
        }
    };

    const handlePasskeySignIn = async () => {
        console.log("=== PASSKEY CLICKED ===");
        setLoading(true);
        setErrorMessage('');

        try {
            await authClient.signIn.passkey({
                autoFill: false,
                fetchOptions: {
                    onSuccess() {
                        console.log("Passkey sign-in successful!");
                        setLoading(false);
                        window.location.href = "/dashboard";
                    },
                    onError(context) {
                        setLoading(false);
                        console.error("Authentication failed:", context.error.message);
                        setErrorMessage("Authentifizierung fehlgeschlagen: " + context.error.message);
                    }
                }
            });
        } catch (err) {
            console.error("Passkey error:", err);
            setErrorMessage("Passkey-Fehler: " + err);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("=== GOOGLE CLICKED ===");
        setLoading(true);
        setErrorMessage('');

        try {
            await signIn.social(
                {
                    provider: "google",
                    callbackURL: "/dashboard"
                },
                {
                    onRequest: () => {
                        console.log("Google sign-in request sent");
                        setLoading(true);
                    },
                    onResponse: () => {
                        console.log("Google sign-in response received");
                        setLoading(false);
                    },
                    onError: (ctx) => {
                        console.error("Google sign-in error:", ctx);
                        setLoading(false);
                        setErrorMessage("Google-Anmeldung fehlgeschlagen");
                    }
                },
            );
        } catch (err) {
            console.error("Google sign-in exception:", err);
            setErrorMessage("Google-Fehler: " + err);
            setLoading(false);
        }
    };

    return (
        <Card sx={{
            maxWidth: 440,
            mx: 'auto',
            mt: 8,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <CardHeader title="Bitte melden Sie sich an" />
            {/* <Box sx={{ p: 1, bgcolor: 'success.main', color: 'white', textAlign: 'center', fontSize: '12px' }}>
                ✓ Komponente geladen | Email: {email.length} | Pass: {password.length}
            </Box> */}
            <CardContent sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {errorMessage && (
                    <Alert
                        severity="error"
                        variant='outlined'
                        sx={{
                            width: 300,
                            minHeight: 48,
                            mb: 2,
                        }}
                        onClose={() => setErrorMessage('')}
                    >
                        {errorMessage}
                    </Alert>
                )}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: 300
                }}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Max@Musterman.de"
                        variant="standard"
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleEmailChange}
                        disabled={loading}
                    />

                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="password">Passwort</InputLabel>
                        <Input
                            value={password}
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange}
                            disabled={loading}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Passwort ausblenden' : 'Passwort anzeigen'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        disabled={loading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id='rememberMe'
                                    name='rememberMe'
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    disabled={loading}
                                />
                            }
                            label="Angemeldet bleiben"
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'secondary',
                                textDecoration: 'underline dotted'
                            }}
                        >
                            <a href="/auth/forgotpassword">Passwort vergessen</a>
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        width: '100%'
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEmailSignIn}
                            disabled={loading}
                            sx={{
                                flexGrow: 1,
                                minHeight: '48px',
                            }}
                        >
                            {loading ? 'Wird angemeldet...' : 'Anmelden'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            href='/auth/signup'
                            disabled={loading}
                            sx={{
                                flexGrow: 1,
                                minHeight: '48px',
                            }}
                        >
                            Registrieren
                        </Button>
                    </Box>
                </Box>

                {loading && (
                    <LinearProgress sx={{
                        width: 300,
                        my: 3,
                    }} />
                )}

                {!loading && (
                    <Divider sx={{
                        my: 3,
                        width: 300
                    }}>
                        Oder melden Sie sich an mit
                    </Divider>
                )}

                <Box sx={{
                    gap: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Button
                        variant='outlined'
                        onClick={handlePasskeySignIn}
                        startIcon={<KeyIcon />}
                        disabled={loading}
                        loading={loading}
                        sx={{
                            width: 300,
                            minHeight: 48,
                            font: 'Roboto',
                        }}
                    >
                        {loading ? 'Wird angemeldet...' : 'Mit Passkey anmelden'}
                    </Button>

                    <Button
                        startIcon={
                            <SvgIcon>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                </svg>
                            </SvgIcon>
                        }
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: 300,
                            minHeight: 48,
                            justifyContent: 'space-between',
                            backgroundColor: '#131314',
                            color: '#E3E3E3'
                        }}
                        disabled={loading}
                        loading={loading}
                        onClick={handleGoogleSignIn}
                    >
                        {loading ? 'Wird angemeldet...' : 'Mit Google anmelden'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}