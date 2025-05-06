import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import Calculator from "../components/Calculator";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Loan Calculator Dashboard
        </Typography>
        <Calculator />
      </Container>
    </Box>
  );
}
