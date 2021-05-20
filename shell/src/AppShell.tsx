import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { AppRenderer } from "./AppRenderer";

const AppShell: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/app-1"
        component={() => <AppRenderer path="app-1" app="LandingPage" />}
      />
      <Route
        path="/app-2"
        component={() => <AppRenderer path="app-2" app="SubPage" />}
      />
    </Switch>
  </BrowserRouter>
);

export { AppShell };
