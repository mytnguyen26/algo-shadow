import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/home/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/home/About.jsx";
import Algorithm from "./pages/algorithm/Algorithm.jsx";
import { Paths } from "./constants/paths.js";
import AlgoLayout from "./pages/algorithm/AlgoLayout.jsx";
import Heap from "./pages/algorithm/Heap.jsx";
import Dijkstra from "./pages/algorithm/Dijkstra.jsx";
import { Callback } from "./pages/auth/Callback.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { Logout } from "./pages/auth/Logout.jsx";
import { AuthGuard } from "./pages/auth/Auth.guard.jsx";
import BST from "./pages/algorithm/BST.jsx";

function App() {
  return (
    <Router>
      {/*<AuthProvider>*/}
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
      {/*</AuthProvider>*/}
    </Router>
  );
}

export default App;
