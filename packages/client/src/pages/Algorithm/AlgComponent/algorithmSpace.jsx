import Paper from "@mui/material/Paper";

export const AlgorithmSpace = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "50vw",
        height: "400px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        marginTop: (theme) =>
          `calc((100vh - 400px - ${theme.spacing(5)}px) / 2)`,
      }}
    />
  );
};
