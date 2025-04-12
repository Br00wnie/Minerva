import React from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { privateRoutes, publicRoutes } from "../routes";
import UserStore from "../stores/UserStore";

const RouteManager = observer(() => {
  const isAuth = !!UserStore.getLogin();
  return (
    <Routes>
      {isAuth &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
});

export default RouteManager;
