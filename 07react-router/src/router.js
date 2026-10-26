import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Github from "./components/Github/Github";
import About from "./components/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children: [
      { index: true, Component: Home },
      { path: "contact", Component: Contact },
      { path: "about", Component: About },

      { path: "github", Component: Github },
    ],
  },
]);

export default router;
