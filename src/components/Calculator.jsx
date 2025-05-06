"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

// Mock exchange rates
const COMMON_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "INR",
  "CNY",
  "BRL",
  "MXN",
];

const mockExchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.8,
  INR: 83.1,
  JPY: 150.2,
  AUD: 1.51,
  CAD: 1.36,
  CNY: 7.23,
  BRL: 5.12,
  MXN: 17.2,
};

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [result, setResult] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setExchangeRates(mockExchangeRates);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      alert("Please enter valid values for all fields");
      return;
    }

    const emiUSD = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentUSD = emiUSD * n;
    const totalInterestUSD = totalPaymentUSD - P;
    const rate =
      selectedCurrency === "USD" ? 1 : exchangeRates?.[selectedCurrency] || 1;

    const schedule = [];
    let remainingBalance = P;

    for (let month = 1; month <= n; month++) {
      const interestPaymentUSD = remainingBalance * r;
      const principalPaymentUSD = emiUSD - interestPaymentUSD;
      remainingBalance -= principalPaymentUSD;

      schedule.push({
        month,
        payment: emiUSD * rate,
        principal: principalPaymentUSD * rate,
        interest: interestPaymentUSD * rate,
        balance: remainingBalance > 0 ? remainingBalance * rate : 0,
      });
    }

    setResult({
      emi: emiUSD * rate,
      totalPayment: totalPaymentUSD * rate,
      totalInterest: totalInterestUSD * rate,
      amortizationSchedule: schedule,
    });
  };

  const resetTable = () => {
    setResult(null);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 5 }, width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: "0.1" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Term (Years)"
            type="number"
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, mb: 5, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={calculateEMI}>
          CALCULATE
        </Button>
      </Box>

      {result && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {[
              ["Monthly EMI", result.emi],
              ["Total Payment", result.totalPayment],
              ["Total Interest", result.totalInterest],
            ].map(([label, value], index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                    >
                      {label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {formatCurrency(value)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={selectedCurrency}
                  label="Currency"
                  onChange={handleCurrencyChange}
                  disabled={loading}
                >
                  {loading ? (
                    <MenuItem value="USD" disabled>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        Loading...
                      </Box>
                    </MenuItem>
                  ) : (
                    COMMON_CURRENCIES.map((code) => (
                      <MenuItem key={code} value={code}>
                        {code}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: { xs: "left", sm: "right" } }}
            >
              <Button variant="outlined" color="secondary" onClick={resetTable}>
                RESET TABLE
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Amortization Schedule
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.amortizationSchedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{formatCurrency(row.payment)}</TableCell>
                    <TableCell>{formatCurrency(row.principal)}</TableCell>
                    <TableCell>{formatCurrency(row.interest)}</TableCell>
                    <TableCell>{formatCurrency(row.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
