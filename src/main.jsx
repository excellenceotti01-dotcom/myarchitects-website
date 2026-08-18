import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource/instrument-serif/400.css";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/animations.css";

// A reload must always initialise the page at the approved hero state. This
// runs before React, Lenis, or any ScrollTriggers are created.
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
