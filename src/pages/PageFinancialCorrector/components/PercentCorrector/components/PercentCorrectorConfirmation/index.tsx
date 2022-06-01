import React from "react";
import BaseModal from "UI/BaseModal";
import BaseButton from "UI/BaseButton";

type Props = {
  loading?: boolean;
  onConfirmModal: () => void;
  onCloseModal: () => void;
};


//todo: Подумать как сконцентрировать всю логику закрыти \ открытия модалки в одном компоненте.
export default function PercentCorrectorConfirmation({ loading, onConfirmModal, onCloseModal }: Props) {
  return (
    <BaseModal onCloseModal={() => !loading && onCloseModal()}>
      <p className="header-2 mb-6 text-center">Are you sure want to delete this correction?</p>
      <BaseButton className="mx-auto mb-2" negative onClick={() => !loading && onConfirmModal()} loading={loading}>
        Yes
      </BaseButton>
      <BaseButton className="mx-auto" disabled={loading} onClick={() => !loading && onCloseModal()}>
        No
      </BaseButton>
    </BaseModal>
  );
}
