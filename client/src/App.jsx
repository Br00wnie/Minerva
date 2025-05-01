import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteManager from "@managers/RouteManager";
import ModalManager from "@managers/ModalManager";
import ToastManager from "@managers/ToastManager";
import EditorToggleManager from "@managers/EditorToggleManager";
import initializeApp from "@src/appInitialization";
import "@layout/AppLayout.css";

function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <BrowserRouter>
      <RouteManager />
      <ModalManager />
      <ToastManager />
      <EditorToggleManager />
    </BrowserRouter>
  );
}

export default App;
