import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";

// Initialize theme before app mounts - default to dark mode
const storedTheme = localStorage.getItem("theme");
const isDark = storedTheme ? storedTheme === "dark" : true; // Default to dark mode if no preference
document.documentElement.classList.toggle("dark", isDark);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
