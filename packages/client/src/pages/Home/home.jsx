import { DisplayCard } from "./component/displayCard.jsx";
import { AlgoList } from "./component/algoList";
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
