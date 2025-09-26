"use client";

import * as React from 'react';
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
    Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { authClient } from '@/lib/auth-client';
import type { Session } from '@/lib/auth-client';


export default function SignupComponent() {


    const [Birthday, setBirthday] = React.useState<Dayjs | null>(dayjs());
    const [Error, setError] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [pswrError, setPswError] = React.useState(false);
    const [MailError, setMailError] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);
    const handleMouseDownRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };




    const handleEmailSignUp = async (event: React.FormEvent) => {
        if (password !== repeatPassword || repeatPassword.length === 0) {
            setError("Passwords do not match");
            setPswError(true);
        } else {
            setError("");
            event.preventDefault();
            if (!email || !password || !name) {
                console.error("E-Mail, Password or Name is missing.");
                setError("E-Mail, Password or Name is missing.");
                setPswError(true);
                setMailError(true);
                return;
            }
            try {
                const { data, error } = await authClient.signUp.email({
                    name: name, // required
                    email: email, // required
                    password: password, // required
                    Birthday: Birthday ? Birthday.toDate() : undefined,
                    callbackURL: "/",
                });
                console.log(`Try with ${email} and Password ${password}...`);
                if (error) {
                    console.error("Error with the registration:", error);
                    setError("Error with the registration: " + error.message)
                } else {
                    console.log("E-Mail registration successful!", data);
                }
            } catch (err) {
                setError("Unexpected error during email registration.");
                console.error("Unexpected error during email registration:", err);
            }
        }
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
                <Box
                    sx={
                        {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }>
                    <CardHeader
                        title="Please Sign Up"
                    />
                </Box>
                <CardContent sx={
                    {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                }>
                    {/* Formular-Container */}
                    <Box
                        component="form"
                        onSubmit={handleEmailSignUp}
                        sx={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                            }
                        }
                    >
                        {Error && (
                            <Alert
                                variant='outlined'
                                severity="error"
                                sx={
                                    {
                                        width: 300,
                                    }
                                }
                            >{Error}

                            </Alert>
                        )
                        }
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={
                                {
                                    width: 300
                                }
                            }
                            id="name"
                            label="Max Musterman"
                            variant="standard"
                            name='name'
                            required

                        />
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={
                                {
                                    width: 300
                                }
                            }
                            id="email"
                            label="Max@Musterman.de"
                            variant="standard"
                            name='email'
                            required
                            error={MailError}
                            helperText={MailError ? "Invalid E-Mail Address" : ""}
                        />

                        <FormControl
                            required
                            sx={
                                {
                                    width: 300
                                }
                            }
                            variant="standard"
                        >
                            <InputLabel
                                htmlFor="standard-adornment-password">
                                Password
                            </InputLabel>
                            <Input
                                error={pswrError}
                                helperText={pswrError ? "Password is too weak" : ""}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                required
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
                        <FormControl
                            required
                            sx={
                                {
                                    width: 300
                                }
                            }
                            variant="standard"
                        >
                            <InputLabel
                            
                                htmlFor="standard-adornment-password">
                                Repeat Password
                            </InputLabel>
                            <Input
                                error={pswrError}
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                name='repeatPassword'
                                required
                                id="standard-adornment-password"
                                type={showRepeatPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showRepeatPassword ? 'hide password' : 'display password'}
                                            onClick={handleClickShowRepeatPassword}
                                            onMouseDown={handleMouseDownRepeatPassword}
                                            onMouseUp={handleMouseUpRepeatPassword}
                                        >
                                            {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <DatePicker
                            disableFuture
                            value={Birthday}
                            onChange={(newValue) => setBirthday(newValue)}
                            label="Birthday"
                            sx={
                                {
                                    width: 300,
                                    height: 48
                                }
                            } />

                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                width: 300
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
                                        '@media (max-width: 600px)': {
                                            width: '100%',
                                        },
                                    }
                                }>
                                Sign Up
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                href='/auth/signin'
                                sx={
                                    {
                                        flexGrow: 1,
                                        minHeight: '48px', // Mindesthöhe beibehalten
                                        '@media (max-width: 600px)': {
                                            width: '100%',
                                        },
                                    }
                                }>
                                Sign In
                            </Button>
                        </Box>
                    </Box>

                    <Divider
                        sx={
                            {
                                my: 3,
                                width: 300
                            }
                        }>
                        Or Sign Up with
                    </Divider>
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
