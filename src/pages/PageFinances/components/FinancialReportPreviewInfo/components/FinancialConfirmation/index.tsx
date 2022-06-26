import React, { MouseEvent } from "react";
import BaseModal from "UI/BaseModal";
import BaseButton from "UI/BaseButton";
import "./style.scss";

type Props = {
  loading: boolean;
  onConfirmModal: () => void;
  onCloseModal: () => void;
};

export default function FinancialConfirmation({ loading, onConfirmModal, onCloseModal }: Props) {
  const handleClickAgree = (evt: MouseEvent): void => {
    evt.stopPropagation();
    !loading && onConfirmModal();
  };

  return (
    <BaseModal className={"financial-confirmation"} onCloseModal={() => !loading && onCloseModal()}>
      <p className={"financial-confirmation__title header-2 mb-6"}>Are you sure?</p>
      <BaseButton className={"mx-auto mb-2"} negative onClick={handleClickAgree} loading={loading}>
        Yes
      </BaseButton>
      <BaseButton className={"mx-auto"} disabled={loading} onClick={() => !loading && onCloseModal()}>
        No
      </BaseButton>
    </BaseModal>
  );
}
