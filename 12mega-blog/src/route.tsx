import { createBrowserRouter } from "react-router";
import App from "./App";
import { AuthLayout } from "./components";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";

// authentication={false} → guests only (logged-in users are sent to "/")
// authentication         → logged-in users only (guests are sent to "/login")
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: "post/:slug", Component: Post },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default router;
