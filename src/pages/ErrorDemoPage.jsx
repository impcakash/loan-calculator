"use client";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";

export default function ErrorDemoPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Error Page
        </Typography>

        <Typography variant="body1" paragraph>
          Something went wrong in the application.
        </Typography>

        <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
          Go to Home
        </Button>
      </Container>
    </Box>
  );
}
