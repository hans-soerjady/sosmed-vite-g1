import { useState } from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom'
import TimelinePage from './pages/Timeline'
import LandingPageRegister from "./pages/LandingPageRegister";
import LandingPageLogin from "./pages/LandingPageLogin";
import Landing from "./pages/Landing";
function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<TimelinePage />} />
        <Route path="/landing/login" element={<LandingPageLogin />} />
        <Route path="/landing/register" element={<LandingPageRegister />} />
      </Routes>
    </div>
  );
}

export default App;
