import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletContextProvider, WalletInfo } from "./components/WalletProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
      <WalletInfo />
    </WalletContextProvider>
  </React.StrictMode>
);
