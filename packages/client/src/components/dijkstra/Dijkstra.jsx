import Box from "@mui/material/Box";
import { DijkstraGraph } from "./DijkstraGraph.jsx";

export const Dijkstra = () => {
  return (
    <div>
      <h1>Dijkstra</h1>
      <Box className="canvas">
        <DijkstraGraph />
      </Box>
    </div>
  );
};
