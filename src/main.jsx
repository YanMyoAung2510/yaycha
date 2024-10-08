// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// // import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemedApp from "./ThemedApp";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
);
