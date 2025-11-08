// Onboarding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleContinue = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="onboarding-root">
      {/* Top logo */}
      <div className="onboarding-header">
        <img src="/vitty_logo.png" alt="Vitty.ai" className="onboarding-logo" />
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