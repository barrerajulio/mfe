import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createMemoryHistory } from "history";

import App from "./App";

const mount = (el, { defaultHistory, onNavigate, initialPath, onSignIn }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);
  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      pathname !== nextPathname && history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  devRoot &&
    mount(devRoot, {
      onNavigate: () => {},
      defaultHistory: createBrowserHistory(),
    });
}

export { mount };
