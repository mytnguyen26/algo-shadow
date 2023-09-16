import { Paths } from "./constants/Paths.js";
import { Home } from "./pages/Home/home.jsx";
import { Layout } from "./pages/Home/layout.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route path={Paths.HOME} element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
