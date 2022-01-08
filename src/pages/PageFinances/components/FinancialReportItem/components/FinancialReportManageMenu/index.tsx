import React, { useState } from "react";
import { ReactComponent as DotsIcon } from "assets/images/icons/dots-vertical.svg";
import { ReactComponent as CrossIcon } from "assets/images/icons/cross.svg";
import { ReactComponent as DeleteIcon } from "assets/images/icons/delete.svg";
import BaseButton from "UI/BaseButton";

import "./style.scss";

type Props = {
  className?: string;
  onDelete: (closeCallback: () => void) => void;
};

export default function FinancialReportManageMenu({ className, onDelete }: Props) {
  const cls = ["report-manage-menu"];
  if (className) cls.push(className);

  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    onDelete(() => setShow(false));
  };

  return (
    <div className={cls.join(" ")}>
      <BaseButton className={"pa-0"} icon onClick={() => setShow(!show)}>
        {show ? <CrossIcon /> : <DotsIcon height={22} width={22} />}
      </BaseButton>

      {show && (
        <div className={"report-manage-menu__content"}>
          <BaseButton className={"report-manage-menu__item pa-0"} icon onClick={handleButtonClick}>
            <DeleteIcon />
          </BaseButton>
        </div>
      )}
    </div>
  );
}
