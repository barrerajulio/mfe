import React, { useEffect, useRef } from "react";
import { mount } from "dashboard/DashboardApp";

export default () => {
  const refToMount = useRef(null);

  useEffect(() => {
    mount(refToMount.current);
  }, []);
  return <div ref={refToMount} />;
};
