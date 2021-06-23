import React from "react";
import { useState } from "react";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { ROUTE } from "../../router/consts";
import useModalLink from "../../hooks/useModalLocation";
import BaseButton from "../BaseButton";
import "./style.scss";

interface Props {
  className?: string;
}

export default function StudyCard({ className }: Props) {
  const [isPrompt, setIsPrompt] = useState(false);
  const { getLocation } = useModalLink();

  const cls = ["study-card"];
  if (className) cls.push(className);
  if (isPrompt) cls.push("study-card__prompt");

  const onClickCard = (evt: React.MouseEvent) => {
    if (evt.currentTarget === evt.target) {
      setIsPrompt(!isPrompt);
    }
  };

  return (
    <div className={cls.join(" ")} tabIndex={0}>
      <p className="study-card__front" onClick={onClickCard}>
        <BaseButton className="study-card__edit" secondary to={getLocation(ROUTE.addCard)}>
          <EditIcon width={24} height={24} />
        </BaseButton>
        <em>happineshappineshappineshappines</em>
      </p>
      <p className={"study-card__back"} onClick={onClickCard}>
        <em>the prompt of happines</em>
      </p>
    </div>
  );
}
