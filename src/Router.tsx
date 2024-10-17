import { Component } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: Array<RouteObject> = [
  {
    id: "root",
    path: "/",
    element: <h1> hello world</h1>,
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
];
const router = createBrowserRouter(routes);

export default router;
