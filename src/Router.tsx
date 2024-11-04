import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import Root from "./Root.tsx";
import { AuthProviderSesion } from "./auth.ts";
import Login from "./apps/Auth/pages/Login.tsx";

const routes: Array<RouteObject> = [
  {
    id: "root",
    path: "",
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
];
const router = createBrowserRouter(routes);

export default router;
