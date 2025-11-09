import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import ProfileOnboarding from "./pages/ProfileOnboarding";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/profile" element={<ProfileOnboarding />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
