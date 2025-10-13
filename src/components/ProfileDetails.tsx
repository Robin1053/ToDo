// src/components/ProfileDetails.tsx

"use client"

import * as React from "react"
import { authClient, type Session } from "@/lib/auth-client"
import {
    Box,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff, Fingerprint } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

export default function ProfileDetails({ session }: { session: Session }) {
    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)
    const [pswrError, setPswrError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('');


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
    const handlePasskeySignIn = async () => {
        setLoading(true)
        setError('')

        try {
            await authClient.passkey.addPasskey({});
        } catch (error) {
            console.error('Error during passkey sign-in:', error)
            setError('Error during passkey registration. Please try again.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Paper
                elevation={3}
                sx={
                    {
                        padding: '20px',
                        margin: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }>

                <Box
                    sx={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }
                    }>

                    <TextField
                        id="Name"
                        label="Name"
                        defaultValue={session.user.name}
                        sx={
                            {
                                width: 300,
                            }
                        }

                    />
                    <TextField
                        id="Email"
                        label="Email"
                        defaultValue={session.user.email}
                        sx={
                            {
                                width: 300,
                            }
                        }

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
                    <Button
                        variant='outlined'
                        startIcon={<Fingerprint />}
                        sx={
                            {
                                width: 300,
                                minHeight: 48,
                            }
                        }
                        disabled={loading}
                        loading={loading}
                        onClick={handlePasskeySignIn}
                    >
                        {loading ? 'Wird angemeldet...' : 'Mit Fingerabdruck anmelden'}
                    </Button>
                    {/* <DatePicker
                        defaultValue={dayjs(session.user.Birthday)}
                        maxDate={dayjs()}
                        sx={

                            {
                                width: 300,
                                marginTop: '10px',
                                marginBottom: '10px',
                            }
                        } /> */}

                </Box>

            </Paper >
        </>
    )
}
