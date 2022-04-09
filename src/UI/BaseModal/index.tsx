import React, { MouseEvent, ReactElement } from "react";
import usePortal from "hooks/usePortal";
import "./style.scss";

type Props = {
  className?: string;
  onCloseModal: () => void;
};

export default function BaseModal({
  children,
  className,
  onCloseModal,
}: Props & { children: ReactElement | ReactElement[] }) {
  const cls = ["base-modal__content"];
  className && cls.push(className);

  const goToPortal = usePortal();

  const handleCurrentTargetCloseModal = ({ target, currentTarget }: MouseEvent): void => {
    target === currentTarget && onCloseModal();
  };

  return goToPortal(
    <div className={"base-modal base-modal__overlay"} onClick={handleCurrentTargetCloseModal}>
      <div className={cls.join(" ")}>{children}</div>
    </div>
  );
}
