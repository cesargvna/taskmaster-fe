import { Component } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import Root from "./Root.tsx";

const routes: Array<RouteObject> = [
  {
    id: "root",
    path: "",
    element: <Root />,
    children: [
      {
        id: "dashboard",
        path: "dashboard/:id",
        //lazy: () => import()"
      },
      {
        id: "projects",
        path: "projects",
      },
      {
        id: "profile",
        path: "profile/:id",
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
];
const router = createBrowserRouter(routes);

export default router;
