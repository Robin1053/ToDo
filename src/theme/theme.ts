"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto, Pacifico, Source_Sans_3 } from "next/font/google"; // "Sour Gummy" ist kein offizieller Google Font. Ich verwende stattdessen "Source Sans 3".

// Definieren Sie Ihre Fonts. Die "variable"-Eigenschaft ist optional,
// aber nützlich, um sie einfach mit Tailwind CSS zu verwenden.
export const fontPrimary = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const fontSecondary = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

export const fontAccent = Source_Sans_3({ 
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a93b0", // Seed-Farbe
      light: "#a1c3da",
      dark: "#3f5d73",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8c7c90", // lavendel
      light: "#c3b1c6",
      dark: "#56485d",
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#679b8c", // mint/teal Akzent
      light: "#9bcbb9",
      dark: "#375a4f",
      contrastText: "#ffffff",
    },

    background: {
      default: "#f8f9fb",
      paper: "#ffffff",
    },
    error: {
      main: "#ba1a1a",
      light: "#ff897d",
      dark: "#93000a",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1a1c1e",
      secondary: "#5c5f62",
    },
  },
  typography: {
    // Korrigierte Zuweisungen für alle Fonts
    fontFamily: fontPrimary.style.fontFamily,
    h1: {
      fontFamily: fontSecondary.style.fontFamily,
      fontSize: "2.5rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: fontSecondary.style.fontFamily,
      fontSize: "2rem",
      fontWeight: 400,
    },
    h3: {
      fontFamily: fontAccent.style.fontFamily,
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    button: {
      fontFamily: fontAccent.style.fontFamily,
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
