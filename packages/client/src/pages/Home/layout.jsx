import { Outlet } from "react-router-dom";
import { Navbar } from "./component/navbar";
import { SplitScreen } from "./component/SplitScreen.jsx";

export const Layout = () => {
  return (
    <SplitScreen leftWeight={1} rightWeight={7} direction="column">
      <Navbar />
      <Outlet />
    </SplitScreen>
  );
};
