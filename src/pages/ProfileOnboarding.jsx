import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages.css";

const experienceOptions = [
  {
    id: "beginner",
    title: "Beginner",
    desc: "I’m just getting started and want the basics explained clearly.",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    desc: "I understand the fundamentals and want to grow my skills.",
  },
  {
    id: "expert",
    title: "Expert",
    desc: "I’m confident in my knowledge and want advanced insights.",
  },
];

const topicOptions = [
  "Investment Research",
  "Tax Planning",
  "Insurance Planning",
  "Portfolio Analysis",
  "Loan Planning",
  "Credit Card",
  "Investment & Wealth",
  "Tax & Compliance",
];

const ProfileOnboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fullName = location.state?.name || "Ritik";
  const firstName = fullName.split(" ")[0];

  // step: 1 = experience, 2 = help-topics, 3 = strong, 4 = weak
  const [step, setStep] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [strongTopics, setStrongTopics] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);

  const logoSrc = process.env.PUBLIC_URL + "/vitty_logo.png";

  // ---------- handlers ----------

  const handleExperienceSelect = (id) => {
    setSelectedExperience(id);
    setStep(2);
  };

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
    // agar kisi topic ko deselect kiya, usko strong/weak se bhi hata do
    setStrongTopics((prev) => prev.filter((t) => t !== topic));
    setWeakTopics((prev) => prev.filter((t) => t !== topic));
  };

  const toggleStrong = (topic) => {
    if (!selectedTopics.includes(topic)) return;

    setStrongTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
    // strong select karte hi weak se nikaal do (no overlap)
    setWeakTopics((prev) => prev.filter((t) => t !== topic));
  };

  const toggleWeak = (topic) => {
    if (!selectedTopics.includes(topic)) return;

    setWeakTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
    // weak select karte hi strong se nikaal do (no overlap)
    setStrongTopics((prev) => prev.filter((t) => t !== topic));
  };

  const handleContinueFromTopics = () => {
    if (selectedTopics.length < 3) return;
    setStep(3);
  };

  const handleContinueFromStrong = () => {
    // at least 1 strong? optional, but UX wise achha hai
    if (strongTopics.length === 0) return;
    setStep(4);
  };

  const handleFinish = () => {
    // yaha pe condition rakh sakte ho; for now at least 1 weak:
    if (weakTopics.length === 0) return;

    // TODO: backend ko payload bhejna (experience, selectedTopics, strong/weak)
    console.log("Onboarding result:", {
      name: fullName,
      experience: selectedExperience,
      interests: selectedTopics,
      strong: strongTopics,
      weak: weakTopics,
    });

    navigate("/home", {
      replace: true,
      state: {
        name: fullName,
        experience: selectedExperience,
        topics: selectedTopics,
        strongTopics,
        weakTopics,
      },
    });
  };

  // ---------- derived ----------

  const canContinueTopics = selectedTopics.length >= 3;
  const canContinueStrong = strongTopics.length > 0;
  const canFinish = weakTopics.length > 0;

  const progress =
    step === 1 ? 20 :
    step === 2 ? 45 :
    step === 3 ? 70 :
    100;

  // ---------- UI ----------

  return (
    <div className="qb-root">
      {/* logo */}
      <div className="qb-logo-wrap">
        <img src={logoSrc} alt="Vitty.ai" className="qb-logo" />
      </div>

      {/* progress */}
      <div className="qb-progress-track">
        <div
          className="qb-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="qb-content">
        {/* STEP 1: Experience */}
        {step === 1 && (
          <>
            <h1 className="qb-heading">
              How would you describe your
              <br />
              financial knowledge?
            </h1>
            <div className="qb-cards">
              {experienceOptions.map((opt) => (
                <button
                  key={opt.id}
                  className="qb-card"
                  onClick={() => handleExperienceSelect(opt.id)}
                >
                  <div className="qb-card-title">{opt.title}</div>
                  <div className="qb-card-desc">{opt.desc}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: Help topics */}
        {step === 2 && (
          <>
            <h1 className="qb-heading">
              How can Vitty help you, {firstName}?
            </h1>

            <div className="qb-chips-wrap">
              {topicOptions.map((topic) => {
                const active = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    className={
                      "qb-chip" + (active ? " qb-chip-active" : "")
                    }
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            <p className="qb-helper">
              Please select at least 3 topics to continue
            </p>

            <button
              className={
                "qb-continue-btn" +
                (canContinueTopics ? " qb-continue-btn-active" : "")
              }
              disabled={!canContinueTopics}
              onClick={handleContinueFromTopics}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 3: Strong points */}
        {step === 3 && (
          <>
            <h1 className="qb-heading">
              What are your strong points?
            </h1>

            <div className="qb-chips-wrap">
              {selectedTopics.map((topic) => {
                const active = strongTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    className={
                      "qb-chip" + (active ? " qb-chip-active" : "")
                    }
                    onClick={() => toggleStrong(topic)}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            <p className="qb-helper">
              Pick the areas you feel most confident in.
            </p>

            <button
              className={
                "qb-continue-btn" +
                (canContinueStrong ? " qb-continue-btn-active" : "")
              }
              disabled={!canContinueStrong}
              onClick={handleContinueFromStrong}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 4: Weak points */}
        {step === 4 && (
          <>
            <h1 className="qb-heading">
              Where do you need more help?
            </h1>

            <div className="qb-chips-wrap">
              {selectedTopics.map((topic) => {
                const active = weakTopics.includes(topic);
                const isStrong = strongTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    className={
                      "qb-chip" +
                      (active ? " qb-chip-active" : "") +
                      (isStrong ? " qb-chip-disabled" : "")
                    }
                    onClick={() => {
                      if (!isStrong) toggleWeak(topic);
                    }}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>

            <p className="qb-helper">
              Choose areas where you’d like Vitty to guide you more.
            </p>

            <button
              className={
                "qb-continue-btn" +
                (canFinish ? " qb-continue-btn-active" : "")
              }
              disabled={!canFinish}
              onClick={handleFinish}
            >
              Finish
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileOnboarding;
