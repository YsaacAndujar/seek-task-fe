import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "context/auth";

interface CustomLayoutProps {
  children: ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const { logOut } = useContext(AuthContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/tasks">
              Tasks
            </Button>
          </Typography>
          <Button color="inherit" onClick={logOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ my: 4, flexGrow: 1 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            p: 3,
            minHeight: '280px',
            boxShadow: 3
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
