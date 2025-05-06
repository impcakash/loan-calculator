"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function AmortizationTable({
  schedule,
  currency,
  formatCurrency,
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, schedule.length);
  const currentItems = schedule.slice(startIndex, endIndex);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        Amortization Schedule ({currency})
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table aria-label="amortization table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: (theme) => theme.palette.action.hover }}
            >
              <TableCell>Month</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((row) => (
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

      {totalPages > 1 && (
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1} to {endIndex} of {schedule.length} entries
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  );
}
