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
  const targetElement = useRef(document.getElementById("portal-target"));

  //todo: предположительно тут нужно делать анимацию для модлки, она тут хотя бы работает
  return ({ children, onClick, className }: PortalFunctionArgs): ReactPortal | null => {
    const cls = ["base-modal"];
    className && cls.push(className);

    return (
      targetElement.current &&
      ReactDOM.createPortal(
        h("div", { className: "overlay", key: uuidv1(), onClick: onClick }, [
          h("div", { className: cls.join(" "), key: uuidv1() }, [children]),
        ]),
        targetElement.current
      )
    );
  };
}
