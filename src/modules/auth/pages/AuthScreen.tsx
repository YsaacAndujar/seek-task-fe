import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import { Login } from "../components/Login";
import { Signin } from "../components/Signin";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            padding: 4,
            backgroundColor: "background.paper"
          }}
        >
          {isLogin ? (
            <Login onChangeLogin={setIsLogin} />
          ) : (
            <Signin onChangeLogin={setIsLogin} />
          )}
        </Paper>
      </Container>
    </Box>
  );
};
