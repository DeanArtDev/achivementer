import React, { PropsWithChildren, MouseEvent } from "react";
import "./style.scss";

interface Props {
  onCloseModal: () => void;
}

export default function BaseModal({ children, onCloseModal }: PropsWithChildren<Props>) {
  const cls = ["base-modal fade-animation"];

  const withHideByOverlayAndButton = (evt: MouseEvent): void => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={"overlay"} onClickCapture={withHideByOverlayAndButton}>
      <div className={cls.join(" ")}>{children}</div>
    </div>
  );
}
