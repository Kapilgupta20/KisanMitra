import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Fdash from "./pages/Fdash/index.jsx";
import Bdash from "./pages/Bdash/Dashboard.jsx";
import NotFound from "./pages/Error.jsx";
import Helpdesk from "./pages/Helpdesk.jsx";
import Listings from "./pages/Fdash/listings.jsx";
import Bdetails from "./pages/Bdash/Info.jsx";
import Marketplace from "./pages/Bdash/marketplace.jsx";
import FContracts from "./pages/Fdash/contracts.jsx";
import BContracts from "./pages/Bdash/contracts.jsx";
import Bchat from "./pages/Bdash/chatting.jsx";
import Fchat from "./pages/Fdash/chatting.jsx";
import ProtectedRoute from "./components/protectedroute.jsx";
import Fdetails from './pages/Fdash/Info.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Landing />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Helpdesk" element={<Helpdesk />} />
        <Route path="/FAQ" element={<Helpdesk />} />
        <Route path="/Contact" element={<Helpdesk />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/Fdashboard" element={<Fdash />} />
          <Route path="/Fdashboard/info" element={<Fdetails/>} />
          <Route path="/Fdashboard/listings" element={<Listings />} />
          <Route path="/Fdashboard/contracts" element={<FContracts />} />
          <Route path="/Fdashboard/chats" element={<Fchat />} />
          <Route path="/Bdashboard" element={<Bdash />} />
          <Route path="/Bdashboard/info" element={<Bdetails />} />
          <Route path="/Bdashboard/marketplace" element={<Marketplace />} />
          <Route path="/Bdashboard/contracts" element={<BContracts />} />
          <Route path="/Bdashboard/chats" element={<Bchat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
