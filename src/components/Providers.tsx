// src/components/Providers.tsx
'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import ThemeRegistry from '@/theme/Registry';


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeRegistry options={{ key: 'mui' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {/* Your app components */}
          {children}
        </LocalizationProvider>
      </ThemeRegistry>
  );
}