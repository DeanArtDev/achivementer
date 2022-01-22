import React, { PropsWithChildren } from "react";

type Props = {
  className?: string;
  type?: string;
};

export default function CustomTag({ type = "div", children, ...props }: PropsWithChildren<Props>) {
  return React.createElement(type, props, children);
}
