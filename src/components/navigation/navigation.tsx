import { Container, Toolbar, AppBar, Box, Button } from "@mui/material";
import HeaderLogo from "./HeaderLogo";
import ProfileMenu from "./ProfileMenu";
import { pages } from "@/config/navigation";
import type { Session } from "@/lib/AuthClient";


export default function Navigation({ session }: { session: Session | null }) {

  const getPageUrl = (page: string) => {
    return page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase()}`;
  };
  
  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Header Logo Komponente */}
            <HeaderLogo />

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component="a"
                  href={getPageUrl(page)}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none"
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Profile Menu Komponente */}
            <ProfileMenu session={session} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}