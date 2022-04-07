import React, { Fragment, useState } from "react";
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
  const cls = ["report-manage-menu"];
  if (className) cls.push(className);

  const [isShowModal, setIsShowModal] = useState(false);

  const handleButtonDelete = () => {
    setIsShowModal(true);
  };

  return (
    <Fragment>
      <BaseSettingMenu className={cls.join(" ")}>
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
