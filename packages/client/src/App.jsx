import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/home/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/home/About.jsx";
import Algorithm from "./pages/algorithm/Algorithm.jsx";
import { Paths } from "./constants/paths.js";
import AlgoLayout from "./pages/algorithm/AlgoLayout.jsx";
import { Callback } from "./pages/auth/Callback.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { Logout } from "./pages/auth/Logout.jsx";
import { AuthGuard } from "./pages/auth/Auth.guard.jsx";
import BSTPage from "./pages/Algorithm/BST.jsx";
import HashTablePage from "./pages/algorithm/Hash.jsx";
import DijkstraPage from "./pages/algorithm/Dijkstra.jsx";
import HeapPage from "./pages/Algorithm/Heap.jsx";

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
              <Route path={Paths.HEAP} element={<HeapPage />} />
              <Route path={Paths.DIJKSTRA} element={<DijkstraPage />} />
              <Route path={Paths.BST} element={<BSTPage />} />
              <Route path={Paths.HASH} element={<HashTablePage />} />
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
