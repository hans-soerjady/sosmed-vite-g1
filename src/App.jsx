import { useState } from "react";
import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom/dist/umd/react-router-dom.development";
import LandingPageRegister from "./pages/LandingPageRegister";
import LandingPageLogin from "./pages/LandingPageLogin";
import Landing from "./pages/Landing";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< Landing/>} />
        <Route path="/landing/login" element={<LandingPageLogin />} />
        <Route path="/landing/register" element={<LandingPageRegister />} />
      </Routes>
    </div>
  );
}

export default App;
