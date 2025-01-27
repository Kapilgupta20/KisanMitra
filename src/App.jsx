import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Fdash from "./pages/Fdash/index.jsx";
import Bdash from "./pages/Bdash/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/FDashboard" element={<Fdash />} />
        <Route path="/BDashboard" element={<Bdash />} />
      </Routes>
    </Router>
  )
}

export default App
