import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Home/layout.jsx";
import { Paths } from "./constants/Paths.js";
import Home from "./pages/Home/home";
import About from "./pages/Home/about.jsx";
import Algorithm from "./pages/Algorithm/algorithm.jsx";
import Heap from "./pages/Algorithm/heap.jsx";
import BST from "./pages/Algorithm/bst.jsx";
import AlgoLayout from "./pages/Algorithm/algoLayout.jsx";
//import { Dijkstra } from "./components/dijkstra/Dijkstra.jsx";
import Dijkstra from "./pages/Algorithm/dijkstra.jsx";
import HashTableVisualization from "./pages/Algorithm/HashComponent/HashTableVisualization.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={Paths.ABOUT} element={<About />} />
          <Route path={Paths.ALGORITHM} element={<AlgoLayout />}>
            <Route index element={<Algorithm />} />
            <Route path={Paths.HEAP} element={<Heap />} />
            <Route path={Paths.BST} element={<BST />} />
            <Route path={Paths.DIJKSTRA} element={<Dijkstra />} />
            <Route path={Paths.HASH} element={<HashTableVisualization />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;