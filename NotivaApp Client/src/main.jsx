import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // Provider makes the Redux store available to any nested components that need to access the Redux store
  <Provider store={store}>
    <App />
  </Provider>,
);
