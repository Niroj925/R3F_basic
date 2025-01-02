
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Light from "./pages/Light";
import Shadow from "./pages/Shadow";
import Loader from "./pages/useLoader";
import Gltf from "./pages/GltFloader";
import Env from "./pages/Environment";
import AdvanceGltf from "./pages/UseGltf";
import RollDice from "./pages/RollDice";

function App() {
  return (
    <BrowserRouter>  
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/light" element={<Light/>} />
    <Route path="/shadow" element={<Shadow/>} />
    <Route path="/loader" element={<Loader/>} />
    <Route path="/gltf" element={<Gltf/>} />
    <Route path="/env" element={<Env/>} />
    <Route path="/agltf" element={< AdvanceGltf/>} />
    <Route path="/dice" element={<RollDice/>} />
  </Routes>
    </BrowserRouter>
  )
}

export default App