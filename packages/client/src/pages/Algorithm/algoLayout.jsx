import { Container, Box } from "@mui/material";
import { DropdownMenu } from "./AlgComponent/dropdownMenu.jsx";
import { Outlet } from "react-router-dom";

const Algorithm = () => {
  return (
    <Container>
      <DropdownMenu />
      <Box sx={{ paddingLeft: 30 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Algorithm;
