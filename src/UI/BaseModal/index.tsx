import { PropsWithChildren, MouseEvent } from "react";
import usePortal from "hooks/usePortal";
import "./style.scss";

type Props = {
  onCloseModal?: () => void;
};

export default function BaseModal({ children, onCloseModal }: PropsWithChildren<Props>) {
  const goToPortal = usePortal();

  const handleCurrentTargetCloseModal = (evt: MouseEvent): void => {
    if (evt.target === evt.currentTarget) {
      onCloseModal && onCloseModal();
    }
  };

  return goToPortal(children, handleCurrentTargetCloseModal);
}
