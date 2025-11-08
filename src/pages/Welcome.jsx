import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages.css";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Google se aaya hua naam yaha expect kar rahe.
  // Agar nahi mila to demo ke liye "Ritik".
  const fullName = location.state?.name || "Ritik";
  const firstName = fullName.split(" ")[0];

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 100);   // title fade
    const t2 = setTimeout(() => setShowSubtitle(true), 700); // subtitle after

    // optional: auto-next after few sec
    // const t3 = setTimeout(() => navigate("/home"), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      // clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <div className="name-screen-root">
      <div className="name-screen-content">
        <h1 className={`name-title ${showTitle ? "fade-in-up" : ""}`}>
          Hi, {firstName}
          <span className="wave-emoji">👋🏻</span>
        </h1>
        <p className={`name-subtitle ${showSubtitle ? "fade-in-up" : ""}`}>
          Let&apos;s get to know you better
        </p>
      </div>
    </div>
  );
};

export default Welcome;
