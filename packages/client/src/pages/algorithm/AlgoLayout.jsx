import { Container, Box } from "@mui/material";
import { DropdownMenu } from "./algo-component/DropdownMenu.jsx";
import { Outlet } from "react-router-dom";

const Algorithm = () => {
  return (
    <Container maxWidth="xl">
      <DropdownMenu />
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Algorithm;
