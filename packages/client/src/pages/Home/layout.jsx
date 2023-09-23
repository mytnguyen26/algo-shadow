// src/pages/Home/layout.jsx

import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { Navbar } from "./component/navbar";
import { DropdownMenu } from "./component/DropdownMenu";
import { SplitScreen } from "./component/SplitScreen.jsx";  // Assuming this is the correct path

export const Layout = () => {
  return (
    <SplitScreen leftWeight={1} rightWeight={7} direction="column">
      <div>
        <Navbar />
        <DropdownMenu />
      </div>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </SplitScreen>
  );
};
