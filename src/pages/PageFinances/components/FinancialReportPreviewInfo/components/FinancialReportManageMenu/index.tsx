import React, { useState } from "react";
import { ReactComponent as DotsIcon } from "assets/images/icons/dots-vertical.svg";
import { ReactComponent as CrossIcon } from "assets/images/icons/close-cross.svg";
import { ReactComponent as DeleteIcon } from "assets/images/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/images/icons/edit.svg";
import BaseButton from "UI/BaseButton";
import FinancialConfirmation from "../FinancialConfirmation";
import "./style.scss";

type Props = {
  className?: string;
  loading: boolean;
  onDelete: () => void;
  onEdit: (closeCallback: () => void) => void;
};

export default function FinancialReportManageMenu({ className, loading, onEdit, onDelete }: Props) {
  const cls = ["report-manage-menu"];
  if (className) cls.push(className);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleButtonEdit = () => {
    onEdit(() => setIsShowMenu(false));
  };

  const handleButtonDelete = () => {
    setIsShowModal(true);
    setIsShowMenu(false);
  };

  //todo: добавить скрытие report-manage-menu__content после потери фокуса.
  //todo: вынести в отдельный кмопонет примнимающий children и выполняющий только функцию показа
  return (
    <div className={cls.join(" ")}>
      <BaseButton className={"pa-0"} icon onClick={() => setIsShowMenu(!isShowMenu)}>
        {isShowMenu ? <CrossIcon height={22} width={22} /> : <DotsIcon height={22} width={22} />}
      </BaseButton>

      {isShowMenu && (
        <div className={"report-manage-menu__content"}>
          <BaseButton className={"report-manage-menu__item pa-0"} icon onClick={handleButtonDelete}>
            <DeleteIcon />
          </BaseButton>

          <BaseButton className={"report-manage-menu__item pa-0"} icon onClick={handleButtonEdit}>
            <EditIcon />
          </BaseButton>
        </div>
      )}

      {isShowModal && (
        <FinancialConfirmation loading={loading} onConfirmModal={onDelete} onCloseModal={() => setIsShowModal(false)} />
      )}
    </div>
  );
}
