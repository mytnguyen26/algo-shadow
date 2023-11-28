import { Container, Box } from "@mui/material";
import { DropdownMenu } from "./AlgComponent/dropdownMenu.jsx";
import { Outlet } from "react-router-dom";

const Algorithm = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <DropdownMenu />
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Algorithm;
