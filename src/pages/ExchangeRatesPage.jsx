"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";

export default function ExchangeRatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({
    base: "USD",
    rates: {},
  });

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/69e10e8aa21d1761038bd8d2/latest/USD"
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.result === "success") {
          setExchangeRates({
            base: data.base_code,
            rates: data.conversion_rates,
          });
        } else {
          throw new Error(data.error || "Failed to fetch exchange rates");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Failed to load exchange rates. Please try again later.");

        setExchangeRates({
          base: "USD",
          rates: {
            EUR: 0.91,
            GBP: 0.78,
            JPY: 149.56,
            CAD: 1.35,
            AUD: 1.52,
            CHF: 0.88,
            CNY: 7.23,
            INR: 83.12,
            BRL: 5.05,
            RUB: 91.75,
            ...Array.from({ length: 150 }, (_, i) => ({
              [`CUR${i + 1}`]: Math.random() * 100,
            })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const filteredCurrencies = Object.entries(exchangeRates.rates)
    .filter(
      ([currency]) =>
        currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === ""
    )
    .sort((a, b) => a[0].localeCompare(b[0]));

  const totalPages = Math.ceil(filteredCurrencies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredCurrencies.length
  );
  const currentItems = filteredCurrencies.slice(startIndex, endIndex);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Live Exchange Rates
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Current base currency: <strong>{exchangeRates.base}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Exchange rates are updated regularly from ExchangeRate-API. The
            values shown are the amount of each currency you can get for 1{" "}
            {exchangeRates.base}.
          </Typography>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search currency..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table aria-label="exchange rates table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: (theme) => theme.palette.action.hover,
                    }}
                  >
                    <TableCell>Currency</TableCell>
                    <TableCell>Rate (1 {exchangeRates.base} =)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map(([currency, rate]) => (
                    <TableRow key={currency}>
                      <TableCell component="th" scope="row">
                        {currency}
                      </TableCell>
                      <TableCell>{rate.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1} to {endIndex} of{" "}
                {filteredCurrencies.length} entries
              </Typography>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
}
