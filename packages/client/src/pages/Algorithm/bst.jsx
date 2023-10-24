import { Container, Box } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace.jsx";
import { ControlArea } from "./AlgComponent/controlArea.jsx";

const BST = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} className="middle-container">
        <AlgorithmSpace />
        <Box mt={2}>
          <ControlArea />
        </Box>
      </Box>
    </Container>
  );
};

export default BST;