import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App.jsx";

ReactDOM.render(
  <App
    ref={ourComponent => {
      window.App = ourComponent;
    }}
  />,
  document.getElementById("root")
);
