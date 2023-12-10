import { useState } from "react";

export const useLinks = () => {
  const [links, setLinks] = useState([
    { source: "A", target: "C", weight: 3 },
    { source: "A", target: "F", weight: 2 },
    { source: "C", target: "F", weight: 2 },
    { source: "C", target: "E", weight: 1 },
    { source: "F", target: "E", weight: 3 },
    { source: "E", target: "B", weight: 2 },
    { source: "C", target: "D", weight: 4 },
    { source: "D", target: "B", weight: 1 },
    { source: "F", target: "B", weight: 6 },
    { source: "F", target: "G", weight: 5 },
    { source: "G", target: "B", weight: 2 },
    // Add more links as needed
  ]);

  return [links, setLinks];
};
