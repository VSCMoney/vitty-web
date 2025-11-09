// src/pages/AuthCallback.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function parseHash(hash) {
  // "#access_token=...&id_token=..." -> { access_token, id_token, ... }
  const trimmed = hash.startsWith("#") ? hash.substring(1) : hash;
  const params = new URLSearchParams(trimmed);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to decode ID token", e);
    return null;
  }
}

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Google is sending tokens in the fragment: /auth/callback#access_token=...
    const hashData = parseHash(window.location.hash);

    const state = hashData.state;
    const expectedState = sessionStorage.getItem("oauth_state");

    if (expectedState && state && state !== expectedState) {
      console.error("State mismatch");
      navigate("/signin", { replace: true });
      return;
    }

    const idToken = hashData.id_token;
    let displayName = "there";

    if (idToken) {
      const payload = decodeJwt(idToken);
      if (payload) {
        displayName =
          payload.given_name || payload.name || payload.email || "there";
      }
    }

    // Clean up
    sessionStorage.removeItem("oauth_state");
    sessionStorage.removeItem("oauth_nonce");

    // Go to welcome with the real name
    navigate("/welcome", {
      replace: true,
      state: { name: displayName },
    });
  }, [navigate]);

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
      <div>Signing you in…</div>
    </div>
  );
};

export default AuthCallback;
