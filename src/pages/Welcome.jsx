import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages.css";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fullName = location.state?.name || "Ritik";
  const firstName = fullName.split(" ")[0];

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 100);
    const t2 = setTimeout(() => setShowSubtitle(true), 700);
    const t3 = setTimeout(() => {
      navigate("/profile", {
        replace: true,
        state: { name: fullName },
      });
    }, 2000); // 2 sec ke baad Q1

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate, fullName]);

  return (
    <div className="name-screen-root">
      <div className="name-screen-content">
        <h1 className={`name-title ${showTitle ? "fade-in-up" : ""}`}>
          Hi, {firstName}
          <span className="wave-emoji">👋🏻</span>
        </h1>
        <p
          className={`name-subtitle ${
            showSubtitle ? "fade-in-up" : ""
          }`}
        >
          Let&apos;s get to know you better
        </p>
      </div>
    </div>
  );
};

export default Welcome;
