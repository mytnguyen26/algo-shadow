import { Container, Box } from "@mui/material";
import { AlgorithmSpace } from "./algo-component/AlgorithmSpace.jsx";
import { ControlArea } from "./algo-component/ControlArea.jsx";

const Algorithm = () => {
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

export default Algorithm;
