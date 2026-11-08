import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

// React Router data mode. `Component` is used instead of `element`
// so this file can stay plain .ts (no JSX needed).
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: ComingSoon },
      { path: "signup", Component: ComingSoon },
      { path: "all-posts", Component: ComingSoon },
      { path: "add-post", Component: ComingSoon },
    ],
  },
]);

export default router;
