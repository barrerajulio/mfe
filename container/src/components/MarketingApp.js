import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
  const refToMount = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(refToMount.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        pathname !== nextPathname && history.push(nextPathname);
      },
      initialPath: history.location.pathname,
    });
    history.listen(onParentNavigate);
  }, []);
  return <div ref={refToMount} />;
};
