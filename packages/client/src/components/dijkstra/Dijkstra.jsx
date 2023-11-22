import Box from "@mui/material/Box";
import { DijkstraGraph } from "./DijkstraGraph.jsx";

var EdgeList = [
  [7,10],
  [1,3,3],
  [3,6,2],
  [3,6,2],
  [1,5,1],
  [6,5,3],
  [5,2,2],
  [3,4,4],
  [4,2,1],
  [6,2,6],
  [6,7,5],
  [7,2,2],
]
// { source: "A", target: "C", weight: 3 },
//     { source: "A", target: "F", weight: 2 },
//     { source: "C", target: "F", weight: 2 },
//     { source: "C", target: "E", weight: 1 },
//     { source: "F", target: "E", weight: 3 },
//     { source: "E", target: "B", weight: 2 },
//     { source: "C", target: "D", weight: 4 },
//     { source: "D", target: "B", weight: 1 },
//     { source: "F", target: "B", weight: 6 },
//     { source: "F", target: "G", weight: 5 },
//     { source: "G", target: "B", weight: 2 },


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
