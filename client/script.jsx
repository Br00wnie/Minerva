// import { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
// import ModalStore from "./src/stores/ModalStore.js";
// import UserStore from "./src/stores/UserStore.js";
// import DocumentStore from "./src/stores/DocumentStore.js";

// export const Context = createContext(null);

createRoot(document.getElementById("root")).render(<App />);
