import React from "react";
import BaseModal from "UI/BaseModal";
import "./style.scss";

type Props = {
  className?: string;
  message: string;
  onCloseError: () => void;
};

export default function ErrorMessageModal({ className, message, onCloseError }: Props) {
  const cls = ["error-message"];
  if (className) cls.push(className);

  return (
    <BaseModal className={cls.join(" ")} onCloseModal={onCloseError}>
      {message}
    </BaseModal>
  );
}
