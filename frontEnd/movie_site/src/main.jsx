// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './App.css';

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b0b0d",
            color: "#fff",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </>
  </Provider>
);
