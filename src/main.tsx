import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AfE2YsA1DwI9Rbzha1bccIWTwFZp5abKZG8YfKIhYbDYy1VHkniyNpU2CrxKjAXSf8eal7Q308vLjkBj",
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
