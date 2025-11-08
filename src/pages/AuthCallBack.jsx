import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    console.log("OAuth code:", code, "state:", state);

    // TODO: yaha backend ko `code` bhejna hai aur real user fetch karna hai.
    // DEMO: directly Welcome pe bhej dete hain:
    navigate("/welcome", {
      replace: true,
      state: { name: "Ritik" },
    });
  }, [location.search, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f0e6",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div>Finishing sign-in…</div>
    </div>
  );
};

export default AuthCallback;
