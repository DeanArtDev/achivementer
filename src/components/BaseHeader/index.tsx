import React from "react";
import { ReactComponent as AddIcon } from "../../images/icons/add.svg";
import { ROUTE } from "../../router/consts";
import useModalLink from "../../hooks/useModalLocation";
import BaseButton from "../BaseButton";

import "./style.scss";

export default function BaseHeader() {
  const cls = ["base-header"];
  const { getLocation } = useModalLink();

  return (
    <header className={cls.join(" ")}>
      <BaseButton secondary to={getLocation(ROUTE.addCard)}>
        <AddIcon className="base-header__add-card" width={24} height={24} />
      </BaseButton>
    </header>
  );
}
