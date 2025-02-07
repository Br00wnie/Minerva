import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { checkToken } from "../utils/tokenChecking";

const RouteManager = () => {
  return (
    <Routes>
      {checkToken() &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default RouteManager;
