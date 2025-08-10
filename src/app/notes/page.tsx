import React from 'react';
import { Box, Typography } from '@mui/material';
export default function notes() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {" "}
        <Typography variant="h2" color="initial">Das ist die Notizen Seite</Typography>
        <p>Diese ist noch geplant, also nichts zu sehen</p>
      </Box></>
  );
}
