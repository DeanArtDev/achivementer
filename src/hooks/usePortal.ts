import { createElement as h, MouseEvent, ReactNode, ReactPortal, useRef } from "react";
import { v1 as uuidv1 } from "uuid";
import ReactDOM from "react-dom";

type PortalFunction = (children: ReactNode | ReactNode[], onClick?: (evt: MouseEvent) => void) => ReactPortal | null;

export default function usePortal(): PortalFunction {
  const element = useRef(document.getElementById("portal-target"));

  return (children: ReactNode | ReactNode[], onClick?: (evt: MouseEvent) => void): ReactPortal | null => {
    return (
      element.current &&
      ReactDOM.createPortal(
        h("div", { className: "overlay", key: uuidv1(), onClick: onClick }, [
          h("div", { className: "base-modal fade-animation", key: uuidv1() }, [children]),
        ]),
        element.current
      )
    );
  };
}
