import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme before app mounts
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDark = storedTheme ? storedTheme === "dark" : prefersDark;
document.documentElement.classList.toggle("dark", isDark);

createRoot(document.getElementById("root")!).render(<App />);
