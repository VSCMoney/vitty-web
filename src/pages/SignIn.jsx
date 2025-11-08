// SignIn.jsx
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_CLIENT_ID = '130321581049-ktqt7omporh5is930jmjpmmbaq5m5noi.apps.googleusercontent.com';
 const basePath =
   process.env.NODE_ENV === "production" ? "/vitty-web" : "";
 const REDIRECT_URI = `${window.location.origin}${basePath}/auth/callback`;

  const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64URLEncode(array);
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return hash;
  };

  const base64URLEncode = (buffer) => {
    const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = base64URLEncode(await sha256(codeVerifier));

      sessionStorage.setItem('code_verifier', codeVerifier);

      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
        state: generateRandomString(32),
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      });

      window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`;
    } catch (error) {
      console.error('Error initiating Google Sign-In:', error);
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = () => {
    console.log('Apple Sign-In clicked');
  };

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return base64URLEncode(array).substring(0, length);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="logo-container">
          <img
            src="/vitty_logo.png"
            alt="Vitty.ai Logo"
            className="logo"
          />
        </div>


        <div className="buttons-container">
          <button
            className="sign-in-button google-button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button
            className="sign-in-button apple-button"
            onClick={handleAppleSignIn}
            disabled={isLoading}
          >
            <svg className="button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="terms-container">
          <p className="terms-text">
            By continuing, you agree to our{' '}
            <a href="/terms" className="terms-link">Terms & Conditions</a>
            <br />
            and <a href="/privacy" className="terms-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;