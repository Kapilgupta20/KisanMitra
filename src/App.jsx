import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Fdash from "./pages/Fdash/index.jsx";
import Bdash from "./pages/Bdash/index.jsx";
import NotFound from "./pages/error.jsx";
import Helpdesk from "./pages/HelpDesk.jsx";
import Fdetails from "./pages/Fdash/fdetails.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/FDashboard" element={<Fdash />} />
        <Route path="/FDashboard/info" element={<Fdetails />} />
        <Route path="/BDashboard" element={<Bdash />} />
        <Route path="/Helpdesk" element={<Helpdesk/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
