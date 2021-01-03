import React, { useEffect, useRef } from "react";
import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        pathname !== nextPathname && history.push(nextPathname);
      },
      initialPath: history.location.pathname,
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
