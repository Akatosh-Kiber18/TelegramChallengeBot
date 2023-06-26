import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<App />);