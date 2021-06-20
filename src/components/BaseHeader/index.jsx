import React from "react";
import { ReactComponent as AddIcon } from "../../images/icons/add.svg";
import BaseButton from "../BaseButton";
import useModalLink from "../../hooks/useModalLocation";
import "./style.scss";

export default function BaseHeader() {
  const cls = ["base-header"];
  const { getLocation } = useModalLink();

  return (
    <header className={cls.join(" ")}>
      <BaseButton secondary to={getLocation("/add-card")}>
        <AddIcon className={"base-header__add-card"} width={24} height={24} />
      </BaseButton>
    </header>
  );
}
