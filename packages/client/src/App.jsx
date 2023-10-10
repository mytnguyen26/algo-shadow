import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Home/layout.jsx";
import Home from "./pages/Home/home"; // Adjust path if necessary
import Algorithm from "./pages/Algorithm/Algorithm.jsx";
import Heap from "./pages/Algorithm/Heap.jsx"; // Adjust path based on where you place it

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/algorithm" element={<Algorithm />} />
          <Route path="/heap" element={<Heap />} /> {/* Added Heap route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
