import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./Context/AppContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </SearchProvider>
  </StrictMode>
);
