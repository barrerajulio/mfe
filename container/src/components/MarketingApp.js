import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";

export default () => {
  const refToMount = useRef(null);
  useEffect(() => {
    mount(refToMount.current);
  }, []);
  return <div ref={refToMount} />;
};
