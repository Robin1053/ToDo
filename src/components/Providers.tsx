'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import theme from "@/theme/theme";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { authClient, type Session } from '@/lib/auth-client';


interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  
  // OneTap sollte INNERHALB der Komponente aufgerufen werden
  useEffect(() => {
    console.log("Providers mounted, calling oneTap");
    authClient.oneTap().catch(err => {
      console.error("OneTap error:", err);
    });
  }, []);

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