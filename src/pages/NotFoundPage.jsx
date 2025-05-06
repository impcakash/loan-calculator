import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        color="primary"
        sx={{ fontSize: "6rem", fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: "md", mb: 4 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Return to Home
      </Button>
    </Box>
  );
}
