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
    Alert,
    SvgIcon,
    Avatar,
    Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { authClient, signIn } from '@/lib/auth-client';


export default function SignupComponent() {


    const [Birthday, setBirthday] = React.useState<Dayjs>(dayjs() || new Date());
    const [Error, setError] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [pswrError, setPswError] = React.useState(false);
    const [MailError, setMailError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = React.useState<string>('')

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

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validiere Dateityp
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setError('Nur JPEG, PNG und WebP Dateien sind erlaubt');
                return;
            }

            // Validiere Dateigröße (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                setError('Datei ist zu groß (max 5MB)');
                return;
            }

            setProfilePic(file);

            // Erstelle Preview
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError(''); // Lösche vorherige Fehler
        }
    };

    const uploadProfilePic = async (userId: string): Promise<string | null> => {
        if (!profilePic) return null;

        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('userId', userId);

        try {
            const response = await fetch('/api/auth/profile-pics', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.imagePath;
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Fehler beim Upload des Profilbildes');
                return null;
            }
        } catch (error) {
            console.error('Fehler beim Upload:', error);
            setError('Fehler beim Upload des Profilbildes');
            return null;
        }
    };




    const handleEmailSignUp = async (event: React.FormEvent) => {
        if (password !== repeatPassword || repeatPassword.length === 0) {
            setError("Passwords do not match");
            setPswError(true);
        } else {
            setError("");
            event.preventDefault();
            setLoading(true);

            if (!email || !password || !name) {
                console.error("E-Mail, Password or Name is missing.");
                setError("E-Mail, Password or Name is missing.");
                setPswError(true);
                setMailError(true);
                setLoading(false);
                return;
            }

            try {
                // Erst den Benutzer registrieren
                const { data, error } = await authClient.signUp.email({
                    name: name,
                    email: email,
                    password: password,
                    Birthday: Birthday.toDate(),
                    callbackURL: "/",
                });

                console.log(`Try with ${email} and Password ${password}...`);

                if (error) {
                    console.error("Error with the registration:", error);
                    setError("Error with the registration: " + error.message);
                    setLoading(false);
                    return;
                }

                console.log("E-Mail registration successful!", data);

                // Wenn ein Profilbild ausgewählt wurde, lade es hoch
                if (profilePic && data?.user?.id) {
                    console.log("Uploading profile picture...");
                    const imagePath = await uploadProfilePic(data.user.id);
                    if (imagePath) {
                        console.log("Profile picture uploaded successfully:", imagePath);

                        // Aktualisiere das Profilbild in der Datenbank
                        try {
                            const updateResponse = await fetch('/api/auth/update-profile-pic', {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: data.user.id,
                                    imagePath: imagePath,
                                }),
                            });

                            if (updateResponse.ok) {
                                console.log("Profile picture updated in database successfully");
                            } else {
                                console.error("Failed to update profile picture in database");
                            }
                        } catch (updateError) {
                            console.error("Error updating profile picture in database:", updateError);
                        }
                    }
                }

                setLoading(false);

            } catch (err) {
                setError("Unexpected error during email registration.");
                console.error("Unexpected error during email registration:", err);
                setLoading(false);
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
                                        minHeight: 48,
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

                        {/* Profilbild Upload */}
                        <Box sx={
                            {
                                width: 300,
                                textAlign: 'center',
                                mt: 2
                            }
                        }>
                            <Typography
                                variant="body2"
                                sx={
                                    {
                                        mb: 1
                                    }
                                }>
                                Profilbild (optional)
                            </Typography>

                            {profilePicPreview && (
                                <Avatar
                                    src={profilePicPreview}
                                    sx={
                                        {
                                            width: 80,
                                            height: 80,
                                            mx: 'auto',
                                            mb: 2
                                        }
                                    }
                                />
                            )}

                            <Button
                                variant="outlined"
                                component="label"
                                sx={
                                    { width: '100%' }
                                }
                                disabled={loading}
                                loading={loading}
                            >
                                {profilePic ? 'Bild ändern' : 'Bild auswählen'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                />
                            </Button>

                            {profilePic && (
                                <Typography
                                    variant="caption"
                                    sx={
                                        {
                                            display: 'block',
                                            mt: 1
                                        }
                                    }>
                                    {profilePic.name}
                                </Typography>
                            )}
                        </Box>

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
                                htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                error={pswrError}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                required
                                id="repeat-password"
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
                            onChange={(newValue) => setBirthday(newValue || dayjs())}
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
                                disabled={loading}
                                sx={
                                    {
                                        flexGrow: 1,
                                        minHeight: '48px',
                                        '@media (max-width: 600px)': {
                                            width: '100%',
                                        },
                                    }
                                }>
                                {loading ? 'Wird registriert...' : 'Sign Up'}
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
                    <Button
                        startIcon={
                            <SvgIcon>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
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
                        }
                        disabled={loading}
                        loading={loading}
                        onClick={async () => {
                            await signIn.social(
                                {
                                    provider: "google",
                                    callbackURL: "/dashboard"
                                },
                                {
                                    onRequest: () => {
                                        setLoading(true);
                                    },
                                    onResponse: () => {
                                        setLoading(false);
                                    },
                                },
                            );
                        }}
                    >
                        Mit Google anmelden
                    </Button>

                </CardContent>
            </Card >
        </>
    );
}
