import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
