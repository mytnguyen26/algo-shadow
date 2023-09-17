import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { Navbar } from "./component/navbar.jsx";
import { SplitScreen } from "./component/splitScreen.jsx";

export const Layout = () => {
  return (
    <SplitScreen leftWeight={1} rightWeight={7} direction="column">
      <Navbar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </SplitScreen>
  );
};
