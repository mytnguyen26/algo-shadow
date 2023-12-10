import { DisplayCard } from "./component/DisplayCard.jsx";
import { AlgoList } from "./component/AlgoList.jsx";
import { Stack } from "@mui/material";

export const Home = () => {
  return (
    <Stack>
      <DisplayCard />
      <AlgoList />
    </Stack>
  );
};
export default Home;
