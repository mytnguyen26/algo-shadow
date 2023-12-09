import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function ResultsTable({ tableData }) {
  // If there's no data, don't render the table
  if (!tableData || tableData.length === 0) return null;

  const reversedResults = [...tableData].reverse();

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Operation</TableCell>
            <TableCell>Input</TableCell>
            <TableCell align="center">Output</TableCell>
            <TableCell align="center">Runtime (ms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reversedResults.map((result, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {result.operation}
              </TableCell>
              <TableCell>
                {Array.isArray(result.input) ? result.input.join(", ") : result.input}
              </TableCell>
              <TableCell align="center">
                {result.output && Array.isArray(result.output)
                  ? result.output.map(item => item.value).join(", ")
                  : result.output}
              </TableCell>
              <TableCell align="center">
                {typeof result.runtime === 'number' ? result.runtime.toFixed(4) : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default ResultsTable;
