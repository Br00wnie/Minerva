import { BrowserRouter } from "react-router-dom";
import RouteManager from "./managers/RouteManager";
import ModalManager from "./managers/ModalManager";
import ToastManager from "./managers/ToastManager";
import useAuthCheck from "./hooks/authCheckHook";
import "./App.css";

function App() {
  useAuthCheck();

  return (
    <BrowserRouter>
      <RouteManager />
      <ModalManager />
      <ToastManager />
    </BrowserRouter>
  );
}

export default App;
