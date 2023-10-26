import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Home/layout.jsx";
import Home from "./pages/Home/home";
import Algorithm from "./pages/Algorithm/algorithm.jsx";
import Heap from "./pages/Algorithm/heap.jsx";
import { Paths } from "./constants/Paths.js";
import AlgoLayout from "./pages/Algorithm/algoLayout.jsx";
import { Dijkstra } from "./pages/Dijkstra/Dijkstra.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={Paths.ALGORITHM} element={<AlgoLayout />}>
            <Route index element={<Algorithm />} />
            <Route path={Paths.HEAP} element={<Heap />} />
            <Route path={Paths.DIJKSTRA} element={<Dijkstra />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
