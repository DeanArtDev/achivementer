import React, { PropsWithChildren, MouseEvent } from "react";
import "./style.scss";

type Props = {
  handleCloseModal: () => void;
};

export default function BaseModal({ children, handleCloseModal }: PropsWithChildren<Props>) {
  const cls = ["base-modal fade-animation"];

  const handleCurrentTargetCloseModal = (evt: MouseEvent): void => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={"overlay"} onClick={handleCurrentTargetCloseModal}>
      <div className={cls.join(" ")}>{children}</div>
    </div>
  );
}
