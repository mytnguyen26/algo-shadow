/**
 * `ResultsTable` is a React component for displaying a list of results in a table format. 
 * This component utilizes Material-UI components to render the table.
 *
 * Props:
 * - `results`: An array of result objects. Each result object should have 'input', 'output', and 'runtime' properties.
 *   - The 'input' property can be a single value or an array.
 *   - The 'output' property can also be a single value or an array. If it's an array, each item in the array should have a 'value' key.
 *   - The 'runtime' property is expected to be a number, representing the time in milliseconds.
 *
 * The table has three columns: 'Input', 'Output', and 'Runtime (ms)'. For each result in the `results` array, a row is added to the table.
 * If the `results` prop is empty or not provided, the component renders nothing (returns null).
 *
 * This component is ideal for displaying structured data such as algorithm outputs, where each entry includes the input data, the resulting output, and the time taken to compute the output.
 */

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
