// Onboarding.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages.css";

const slides = [
  {
    title: "Super intelligent",
    subtitle:
      "Thinks faster, learns deeper, and plans smarter—so you don't have to.",
  },
  {
    title: "Always on your side",
    subtitle:
      "Understands your goals, risk, and constraints—without selling you anything.",
  },
  {
    title: "Built for Indian money",
    subtitle:
      "From FDs to futures, Vitty.ai helps you see your full picture, clearly.",
  },
];

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const [heroPhase, setHeroPhase] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const logoSrc = process.env.PUBLIC_URL + "/vitty_logo.png";

  // Detect if we came from Splash
  useEffect(() => {
    if (location.state?.fromSplash) {
      // start hero animation
      setHeroPhase("start");

      // clear history state so refresh/back pe dubara na ho
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      // next frame -> move to end position
      requestAnimationFrame(() => {
        setHeroPhase("end");
      });
    }
  }, [location.state]);

  const handleContinue = () => {
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      navigate("/signin");
    }
  };

  const logoClass =
    heroPhase === "start"
      ? "onboarding-logo hero-logo hero-start"
      : heroPhase === "end"
      ? "onboarding-logo hero-logo hero-end"
      : "onboarding-logo";

  return (
    <div className="onboarding-root">
      {/* Top logo (with optional hero animation) */}
      <div className="onboarding-header">
        <img src={logoSrc} alt="Vitty.ai" className={logoClass} />
      </div>

      {/* Center content */}
      <div className="onboarding-center">
        <h1 className="onboarding-heading">{slides[index].title}</h1>
        <p className="onboarding-subtitle">{slides[index].subtitle}</p>
      </div>

      {/* Bottom indicators + button */}
      <div className="onboarding-bottom">
        <div className="onboarding-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`onboarding-dot ${
                i === index ? "onboarding-dot-active" : ""
              }`}
            />
          ))}
        </div>

        <button className="onboarding-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
