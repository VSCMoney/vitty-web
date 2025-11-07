import React, { useEffect, useState, useRef } from "react";

function App() {
  const [user, setUser] = useState(null);
  const buttonDiv = useRef(null);

  // 👇 yahan apna client id daalo
  const CLIENT_ID = "130321581049-ktqt7omporh5is930jmjpmmbaq5m5noi.apps.googleusercontent.com";

  // ID token decode helper (sirf demo ke liye)
  function decodeJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("JWT decode error", e);
      return null;
    }
  }

  useEffect(() => {
    /* global google */
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => {
        const decoded = decodeJwt(response.credential);
        if (decoded) {
          setUser({
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
          });
        }
      },
    });

    if (buttonDiv.current) {
      window.google.accounts.id.renderButton(buttonDiv.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [CLIENT_ID]);

  const handleLogout = () => {
    setUser(null);
    // optional: revoke
    if (window.google && user?.email) {
      window.google.accounts.id.revoke(user.email, () => {
        console.log("User consent revoked");
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0f172a",
        color: "#e5e7eb",
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>My Google Login Demo</h1>
      <p style={{ marginBottom: "24px", opacity: 0.8 }}>
        Click below to sign in with Google
      </p>

      {!user && (
        <div ref={buttonDiv} /> // yahan Google button render hoga
      )}

      {user && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px 20px",
            borderRadius: "16px",
            background: "#111827",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "999px",
            }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>{user.email}</div>
            <button
              onClick={handleLogout}
              style={{
                marginTop: "8px",
                padding: "6px 10px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
