'use client';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import theme from "@/theme/theme";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { ReactNode } from 'react';
import type { Session } from '@/lib/AuthClient';

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <NextAppProvider
        theme={theme}
        session={session}
      >
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </NextAppProvider>
    </LocalizationProvider>
  );
}