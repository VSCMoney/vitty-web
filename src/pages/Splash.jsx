import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding", { replace: true });
    }, 2000); // 2 sec splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-root">
      <div className="splash-content">
        <img
          src="/vitty_logo.png"
          alt="Vitty.ai"
          className="splash-logo"
        />
      </div>
    </div>
  );
};

export default Splash;
