import React, { ReactNode } from "react";

type childrenProp = {
  children: ReactNode;
};
const LayoutCreation = ({ children }: childrenProp) => {
  return <div className="mt-10">{children}</div>;
};

export default LayoutCreation;
