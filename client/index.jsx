import { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/index.jsx";
import ModalStore from "./src/stores/ModalStore.js";
import UserStore from "./src/stores/UserStore.js";
import DocumentStore from "./src/stores/DocumentStore.js";
import StyleStore from "./src/stores/StyleStore.js";

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      ModalStore: new ModalStore(),
      UserStore: new UserStore(),
      DocumentStore: new DocumentStore(),
      StyleStore: new StyleStore(),
    }}
  >
    <App />
  </Context.Provider>
);
