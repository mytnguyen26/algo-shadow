import { Paths } from "./constants/Paths.js";
import { Home } from "./pages/Home/home.jsx";
import { Layout } from "./pages/Home/layout.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dijkstra } from "./pages/Dijkstra/Dijkstra.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.DIJKSTRA} element={<Dijkstra />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
