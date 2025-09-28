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
import { authClient, Session } from '@/lib/auth-client';

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

        const { data, error } = await authClient.signIn.passkey({
            autoFill: true,
        });
        console.log(`trying to sign in with passkey for email ${email}...`);

        if (error) {
            console.error("Error signing in with passkey:", error);
            setErrorMessage("Error signing in with passkey: " + error.message);
        } else {
            console.log("Passkey sign-in successful!", data);
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
    );
}
