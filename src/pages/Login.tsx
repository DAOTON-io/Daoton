import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

// telegram color
const telegramColor = "#20A8E7";

export const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" style={{ background: "linear-gradient(#EC7D31, #20A8E7)", height: "100vh", padding: 0, margin: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px",
            padding: "3rem",
            borderRadius: "8px",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            background: "white",
          }}
        >
          <img src={"https://i.ibb.co/XYv6QT1/Daoton-Logo.png"} width="200" height="auto"></img>
          <Typography component="h1" variant="h4" style={{ fontWeight: "600" }}>
            WELCOME,
          </Typography>
          <Typography component="h1" variant="h5" style={{ color: "hsla(208,7%,46%,.75)" }}>
            Sign in to continue
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Connect With Ton
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
