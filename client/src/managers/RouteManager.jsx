import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "@src/routes";
import { getUserStore } from "@stores/UserStore";

const RouteManager = () => {
  const isAuth = !!getUserStore().login;
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
};

export default RouteManager;
