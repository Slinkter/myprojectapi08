/**
 * @file main.jsx
 * @description The main entry point for the React application.
 * This file is responsible for rendering the root component (`App`) into the DOM.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Render the main application component into the 'root' element in the HTML.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

