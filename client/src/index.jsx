import { BrowserRouter } from "react-router-dom";
import RouteManager from "./managers/RouteManager";
import ModalManager from "./components/modals/ModalManager";
import { ToastManager } from "./components/ui/toast/MyToast";
import "./index.css";
import { useAuthCheck } from "./hooks/authCheckHook";

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
