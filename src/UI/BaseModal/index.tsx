import { PropsWithChildren, MouseEvent } from "react";
import usePortal from "hooks/usePortal";
import "./style.scss";

type Props = {
  className?: string;
  onCloseModal: () => void;
};

export default function BaseModal({ children, className, onCloseModal }: PropsWithChildren<Props>) {
  const goToPortal = usePortal();

  const handleCurrentTargetCloseModal = ({ target, currentTarget }: MouseEvent): void => {
    target === currentTarget && onCloseModal();
  };

  return goToPortal({ children, onClick: handleCurrentTargetCloseModal, className });
}
