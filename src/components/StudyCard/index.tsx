import React from "react";
import { useState } from "react";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import useModalLink from "../../hooks/useModalLocation";
import BaseButton from "../BaseButton";

import { ROUTE } from "../../router/consts";

import "./style.scss";
import {useHistory} from "react-router-dom";

interface Props {
  className?: string;
}

export default function StudyCard({ className }: Props) {
  const [isPrompt, setIsPrompt] = useState(false);
  const history = useHistory();
  const { getLocation } = useModalLink();

  const cls = ["study-card"];
  if (className) cls.push(className);
  if (isPrompt) cls.push("study-card__prompt");

  const onEditCardClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    history.push(getLocation(ROUTE.addCard));
  };

  return (
    <div className={cls.join(" ")} tabIndex={0} onClick={() => setIsPrompt(!isPrompt)}>
      {/* <span>{card.memorizingText}</span>
      <span>{card.prompt}</span> */}
      <p className="study-card__front">
        <BaseButton className="study-card__edit" secondary onClick={onEditCardClick}>
          <EditIcon width={24} height={24} />
        </BaseButton>
        <em>happineshappineshappineshappines</em>
      </p>
      <p className={"study-card__back"}>
        <em>the prompt of happines</em>
      </p>
    </div>
  );
}
