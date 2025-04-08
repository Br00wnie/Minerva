import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteManager from "./managers/RouteManager";
import ModalManager from "./managers/ModalManager";
import ToastManager from "./managers/ToastManager";
import showWelcomeMessage from "./utils/welcomeMessage";
import "./App.css";

function App() {
  useEffect(() => {
    showWelcomeMessage();
  }, []);

  return (
    <BrowserRouter>
      <RouteManager />
      <ModalManager />
      <ToastManager />
    </BrowserRouter>
  );
}

export default App;
