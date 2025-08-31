// theme/Registry.tsx
'use client';
import * as React from 'react';
import EmotionCache from './EmotionCache';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export default function ThemeRegistry(props: any) {
  const { options, children } = props;
  return (
    <EmotionCache options={options}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </EmotionCache>
  );
}