import { Box, Typography } from "@mui/material";

export default function NotesPage() {
    // TODO: Implement the notes page
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Typography
                variant="h1"
                color="info"
                fontFamily={"'Sour Gummy', cursive"}
            >
                Here will come a Notes Page
            </Typography>
        </Box>
    );
}