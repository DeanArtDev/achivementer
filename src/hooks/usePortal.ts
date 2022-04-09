import { createElement as h, MouseEvent, ReactNode, ReactPortal, useRef } from "react";
import { v1 as uuidv1 } from "uuid";
import ReactDOM from "react-dom";

type PortalFunctionArgs = {
  children: ReactNode | ReactNode[];
  onClick?: (evt: MouseEvent) => void;
  className?: string;
};

type PortalFunction = (args: PortalFunctionArgs) => ReactPortal | null;

export default function usePortal(): PortalFunction {
  const targetElement = useRef<HTMLElement>(document.getElementById("portal-target"));

  //todo: предположительно тут нужно делать анимацию для модлки, она тут хотя бы работает
  return ({ children, onClick, className }: PortalFunctionArgs): ReactPortal | null => {
    const cls = [];
    className && cls.push(className);

    if (!targetElement.current) return null;
    return ReactDOM.createPortal(
      h("div", { className: "overlay", key: uuidv1(), onClick: onClick }, [
        h("div", { className: cls.join(" "), key: uuidv1() }, [children]),
      ]),
      targetElement.current
    );
  };
}
