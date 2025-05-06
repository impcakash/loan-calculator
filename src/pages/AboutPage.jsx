"use client";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";

export default function AboutPage() {
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
          About This App
        </Typography>

        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application
          built using React JS and Material UI. It allows users to calculate
          loan EMIS (Equated Monthly Installments), view a detailed amortization
          schedule, and see real-time currency conversions of their EMI using
          live exchange rates.
        </Typography>

        <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
          Go to Home
        </Button>
      </Container>
    </Box>
  );
}
