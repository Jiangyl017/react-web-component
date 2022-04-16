import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import ReactWebComponent from "./react-web-component";
import "antd/dist/antd.css";
import { TreeSelect } from "antd";

ReactWebComponent.create(TreeSelect, "antd-tree");

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <App />
)