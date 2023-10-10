import { Container, Box } from '@mui/material';
import { AlgorithmSpace } from "./AlgComponent/AlgorithmSpace";
import { ControlArea } from "./AlgComponent/ControlArea.jsx";

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
