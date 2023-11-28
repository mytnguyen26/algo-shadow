import Paper from "@mui/material/Paper";

export const AlgorithmSpace = ({ svgRef, width, height, resetkey }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "width",
        height: "height",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        marginTop: (theme) =>
          `calc((100vh - 400px - ${theme.spacing(5)}px) / 2)`,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <svg key={resetkey} ref={svgRef} width={width} height={height}></svg>
      </div>
    </Paper>
  );
};
