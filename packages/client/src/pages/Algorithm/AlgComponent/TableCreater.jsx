import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Input</TableCell>
            <TableCell align="center">Output</TableCell>
            <TableCell align="center">Runtime (ms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {Array.isArray(result.input) ? result.input.join(", ") : result.input}
              </TableCell>
              <TableCell align="center">
                {result.output && Array.isArray(result.output)
                  ? result.output.map(item => item.value).join(", ")
                  : result.output}
              </TableCell>
              <TableCell align="center">
                {result.runtime ? result.runtime.toFixed(4) : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultsTable;
