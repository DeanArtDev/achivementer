import React, { Fragment, useRef, useState, MouseEvent } from "react";
import { ReactComponent as DeleteIcon } from "assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/edit.svg";
import BaseButton from "UI/BaseButton";
import BaseSettingMenu from "UI/BaseSettingMenu";
import FinancialConfirmation from "../FinancialConfirmation";

type Props = {
  className?: string;
  loading: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export default function FinancialReportManageMenu({ className, loading, onEdit, onDelete }: Props) {
  const cls = [];
  if (className) cls.push(className);

  const [isShowModal, setIsShowModal] = useState(false);

  const toggleCallback = useRef<(() => void) | null>(null);
  const handleMenuToggle = (callback: () => void): void => {
    toggleCallback.current = callback;
  };

  const handleButtonDelete = (evt: MouseEvent) => {
    evt.stopPropagation();
    setIsShowModal(true);
    toggleCallback.current && toggleCallback.current();
  }

  return (
    <Fragment>
      <BaseSettingMenu className={cls.join(" ")} onToggleShowing={handleMenuToggle}>
        <BaseButton className={"pa-0"} icon onClick={handleButtonDelete}>
          <DeleteIcon />
        </BaseButton>

        <BaseButton className={"pa-0"} icon onClick={onEdit}>
          <EditIcon />
        </BaseButton>
      </BaseSettingMenu>

      {isShowModal && (
        <FinancialConfirmation loading={loading} onConfirmModal={onDelete} onCloseModal={() => setIsShowModal(false)} />
      )}
    </Fragment>
  );
}
