import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const basename =
  process.env.NODE_ENV === "production" ? "/vitty-web" : "/";

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
