/**
 * This is Dijkstra page component for the UI
 */
import Box from "@mui/material/Box";
import { DijkstraGraph } from "../Algorithm/DijkstraComponent/DijkstraGraph";

const Dijkstra = () => {
  return (
    <div>
      <h1>Dijkstra</h1>
      <Box className="canvas">
        <DijkstraGraph />
      </Box>
    </div>
  );
};

export default Dijkstra;