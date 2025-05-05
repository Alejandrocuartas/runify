import * as React from "react";
import { createRoot } from "react-dom/client";
import { Context } from "./context";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(<Context><App /></Context>);