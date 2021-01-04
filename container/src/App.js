import React, { lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();
export default () => {
  const [isSignIn, setIsSignIn] = useState(false);
  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    history.push("/dashboard");
  }, [isSignIn]);
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignIn(true)} />
              </Route>
              <Route path="/dashboard">
                {isSignIn ? <DashboardLazy /> : <Redirect to="/" />}
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
