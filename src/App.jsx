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
import Listings from "./pages/Fdash/listings.jsx";
import Bdetails from "./pages/Bdash/Bdetails.jsx";
import Marketplace from "./pages/Bdash/marketplace.jsx";
import FContracts from "./pages/Fdash/contracts.jsx";
import BContracts from "./pages/Bdash/contracts.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Fdashboard" element={<Fdash />} />
        <Route path="/Fdashboard/info" element={<Fdetails />} />
        <Route path="/Fdashboard/listings" element={<Listings/>} />
        <Route path="/Fdashboard/contracts" element={<FContracts />} />
        <Route path="/Bdashboard" element={<Bdash />} />
        <Route path="/Bdashboard/info" element={<Bdetails/>} />
        <Route path="/Bdashboard/marketplace" element={<Marketplace />}/>
        <Route path="/Bdashboard/contracts" element={<BContracts />} />
        <Route path="/Helpdesk" element={<Helpdesk/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
