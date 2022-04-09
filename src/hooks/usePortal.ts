import { ReactNode, ReactPortal, useRef } from "react";
import ReactDOM from "react-dom";

type PortalFunction = (children: ReactNode | ReactNode[]) => ReactPortal | null;

export default function usePortal(): PortalFunction {
  const targetElement = useRef<HTMLElement | null>(null);

  //todo: предположительно тут нужно делать анимацию для модлки, она тут хотя бы работает
  return (children: ReactNode | ReactNode[]): ReactPortal | null => {
    targetElement.current = document.getElementById("portal-target");

    if (!targetElement.current) return null;
    return ReactDOM.createPortal(children, targetElement.current);
  };
}
