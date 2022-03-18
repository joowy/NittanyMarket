import * as React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

export const App = () => {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
};
