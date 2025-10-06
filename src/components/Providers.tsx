'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import theme from "@/theme/theme";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { authClient, type Session } from '@/lib/auth-client';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  const [mounted, setMounted] = React.useState(true);
  // OneTap sollte INNERHALB der Komponente aufgerufen werden
  useEffect(() => {
    console.log("Providers mounted, calling oneTap");
    authClient.oneTap().catch(err => {
      console.error("OneTap error:", err);
    });
  }, []);

  useEffect(() => {
    console.log("Component mounted!");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Typography
            sx={
              {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontWeight: '100',
                fontFamily: 'Sour Gummy',
                fontSize: '32px',
              }
            }>Loading...
          </Typography>
          <CircularProgress />
        </MuiThemeProvider>
      </>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NextAppProvider
        theme={theme}
        session={session}
        authentication={{
          signIn: () => {
            window.location.href = "/auth/signin";
          },
          signOut: async () => {
            await authClient.signOut();
          }
        }}
      >
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </NextAppProvider>
    </LocalizationProvider>
  );
}