import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Home/layout.jsx";
import Home from "./pages/Home/home";
import About from "./pages/Home/about.jsx";
import Algorithm from "./pages/Algorithm/algorithm.jsx";
import { Paths } from "./constants/Paths.js";
import AlgoLayout from "./pages/Algorithm/algoLayout.jsx";
import Heap from "./pages/Algorithm/heap.jsx";
import Dijkstra from "./pages/Algorithm/dijkstra.jsx";
import { Callback } from "./pages/Auth/callback.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { Logout } from "./pages/Auth/logout.jsx";
import { AuthGuard } from "./pages/Auth/auth.guard.jsx";
import BST from "./pages/Algorithm/bst.jsx";
//import { Dijkstra } from "./components/dijkstra/Dijkstra.jsx";

function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<AuthGuard />}>
            <Route path={Paths.ALGORITHM} element={<AlgoLayout />}>
              <Route index element={<Algorithm />} />
              <Route path={Paths.HEAP} element={<Heap />} />
              <Route path={Paths.DIJKSTRA} element={<Dijkstra />} />
              <Route path={Paths.BST} element={<BST />} />
            </Route>
          </Route>
          <Route path={Paths.ABOUT} element={<About />} />
          <Route path={Paths.LOGOUT} element={<Logout />} />
          <Route path={Paths.CALLBACK} element={<Callback />} />
          <Route path={Paths.LOGIN} element={<AuthGuard />} />
        </Route>
      </Routes>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
