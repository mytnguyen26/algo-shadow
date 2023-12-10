import { Typography, Stack } from "@mui/material";

export const DisplayCard = () => {
  return (
    <Stack
      sx={{
        height: "300px",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Algo-Shadow</Typography>
      <Typography variant="h5" color="grey.400">
        Visualizing Algorithms
      </Typography>
    </Stack>
  );
};
