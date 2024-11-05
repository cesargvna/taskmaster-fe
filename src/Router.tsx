import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import Root from "./Root.tsx";
import { AuthProviderSesion } from "./auth.ts";
import Login from "./apps/Auth/pages/Login.tsx";

const routes: Array<RouteObject> = [
  {
    id: "root",
    path: "protected",
    element: <Root />,
    children: [
      {
        id: "dashboard",
        path: "dashboard",
        lazy: () =>
          import("./apps/Main/pages/Dashboard.tsx").then((module) => ({
            Component: module.default,
          })),
      },
      {
        id: "projects",
        path: "projects",
        element: <h1>Projects</h1>,
      },
      {
        id: "profile",
        path: "profile",
        lazy: () =>
          import("./apps/Main/pages/Profile.tsx").then((module) => ({
            Component: module.default,
          })),
      },
      {
        id: "tasks",
        path: "tasks",
        lazy: () =>
          import("./apps/Main/pages/CreateTask.tsx").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
  {
    id: "about",
    path: "/about",
    element: <h1> about</h1>,
  },
  {
    id: "login",
    path: "login",
    lazy: () =>
      import("./apps/Auth/pages/Login.tsx").then((module) => ({
        Component: module.default,
      })),
  },
  {
    id: "forgot-password",
    path: "forgot-password",
    lazy: () =>
      import("./apps/Auth/pages/ForgotPassword.tsx").then((module) => ({
        Component: module.default,
      })),
  },
  {
    id: "reset-password",
    path: "reset-password/:token",
    lazy: () =>
      import("./apps/Auth/pages/ResetPassword.tsx").then((module) => ({
        Component: module.default,
      })),
  },
  {
    id: "signup",
    path: "signup",
    lazy: () =>
      import("./apps/Auth/pages/Signup.tsx").then((module) => ({
        Component: module.default,
      })),
  },
  {
    id: "logout",
    path: "logout",
    element: <Login />,
    loader() {
      AuthProviderSesion.signout();
      return redirect("/login");
    },
  },
  {
    id: "landing",
    path: "/",
    lazy: () =>
      import("./apps/Main/pages/LandingPage.tsx").then((module) => ({
        Component: module.default,
      })),
  },
];
const router = createBrowserRouter(routes);

export default router;
