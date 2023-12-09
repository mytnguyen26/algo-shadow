import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const AlgorithmSpace = ({ svgRef, width, height, resetKey }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: width,
        height: height,
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        marginTop: (theme) =>
          `calc((100vh - 400px - ${theme.spacing(5)}px) / 2)`,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <svg key={resetKey} ref={svgRef} width={width} height={height}></svg>
      </Box>
    </Paper>
  );
};
