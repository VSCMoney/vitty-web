import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// GitHub Pages ke liye basename set:
// local pe "/" rahega, production pe "/vitty-web"
const basename =
  process.env.NODE_ENV === "production" ? "/vitty-web" : "/";

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
