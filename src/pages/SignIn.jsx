// SignIn.jsx
import React, { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_CLIENT_ID =
    "130321581049-ktqt7omporh5is930jmjpmmbaq5m5noi.apps.googleusercontent.com";

  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/vitty-web" : "";
  const REDIRECT_URI = `${window.location.origin}${basePath}/auth/callback`;
  const GOOGLE_AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth";

  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64URLEncode(array);
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    return hash;
  };

  const base64URLEncode = (buffer) => {
    const bytes =
      buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return base64URLEncode(array).substring(0, length);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = base64URLEncode(await sha256(codeVerifier));
      const state = generateRandomString(32);

      sessionStorage.setItem("code_verifier", codeVerifier);
      sessionStorage.setItem("pkce_state", state);

      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256"
      });

      window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`;
    } catch (error) {
      console.error("Error initiating Google Sign-In:", error);
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign-In clicked");
  };

  const logoSrc = process.env.PUBLIC_URL + "/vitty_logo.png";

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="logo-container">
          <img src={logoSrc} alt="Vitty.ai Logo" className="logo" />
        </div>

        <div className="buttons-container">
          <button
            className="sign-in-button google-button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {/* svg same */}
            Continue with Google
          </button>

          <button
            className="sign-in-button apple-button"
            onClick={handleAppleSignIn}
            disabled={isLoading}
          >
            {/* svg same */}
            Continue with Apple
          </button>
        </div>

        <div className="terms-container">
          {/* same terms */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
