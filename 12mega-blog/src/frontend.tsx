/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the router to the DOM.
 *
 * It is included in `src/index.html`.
 */
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import store from "./store/store";
import router from "./route";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(app);
