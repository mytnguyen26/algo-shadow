import { DisplayCard } from "./component/displayCard.jsx";
import { Stack } from "@mui/material";
import { AlgoList } from "./component/algoList";

export const Home = () => {
  return (
    <Stack>
      <DisplayCard />
      <AlgoList />
    </Stack>
  );
};
