import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Home/layout.jsx";
import Home from "./pages/Home/home";
import Algorithm from "./pages/Algorithm/algorithm.jsx";
import Heap from "./pages/Algorithm/heap.jsx";
import { Paths } from "./constants/Paths.js";
import AlgoLayout from "./pages/Algorithm/algoLayout.jsx";
import { Dijkstra } from "./pages/Dijkstra/Dijkstra.jsx";
import { Callback } from "./pages/Auth/callback.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { Logout } from "./pages/Auth/logout.jsx";
import { AuthGuard } from "./pages/Auth/auth.guard.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={Paths.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<AuthGuard />}>
              <Route path={Paths.ALGORITHM} element={<AlgoLayout />}>
                <Route index element={<Algorithm />} />
                <Route path={Paths.HEAP} element={<Heap />} />
                <Route path={Paths.DIJKSTRA} element={<Dijkstra />} />
              </Route>
            </Route>
            <Route path={Paths.LOGOUT} element={<Logout />} />
            <Route path={Paths.CALLBACK} element={<Callback />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
