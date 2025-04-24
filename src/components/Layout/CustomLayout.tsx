import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store";
import { logout as logoutDispatch } from "store/authSlice";
import Swal from "sweetalert2";

interface CustomLayoutProps {
  children: ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const dispatch = useAppDispatch()
  const logout = () =>{
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(logoutDispatch())
      }
    });
    
  }

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
          <Button color="inherit" onClick={logout}>
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
