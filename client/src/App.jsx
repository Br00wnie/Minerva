import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteManager from "./managers/RouteManager";
import ModalManager from "./managers/ModalManager";
import ToastManager from "./managers/ToastManager";
import initializeApp from "./utils/appInitialization";
import "./components/layout/AppLayout.css";

function App() {
  useEffect(() => {
    initializeApp();
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
