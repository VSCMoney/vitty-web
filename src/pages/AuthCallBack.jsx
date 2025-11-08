import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    console.log("Auth callback code:", code, "state:", state);

    // TODO: yaha future me backend ko `code` bhejna hai.
    // Abhi demo: fake name se Welcome pe bhej do
    navigate("/welcome", { replace: true, state: { name: "Ritik" } });
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
