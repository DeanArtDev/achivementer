import { ReactComponent as EditIcon } from "../../../../assets/images/icons/edit.svg";

import React from "react";
import { useState } from "react";
import { ROUTE } from "../../../../router/consts";
import useModalLink from "../../../../hooks/useModalLocation";
import BaseButton from "../../../UI/BaseButton";
import "./style.scss";

interface Props {
  className?: string;
  termUnderStudy: string;
  definition?: string;
}

export default function StudyCard({ className, termUnderStudy, definition }: Props) {
  const { getLocation } = useModalLink();
  const [isPrompt, setIsPrompt] = useState(false);

  const cls = ["study-card"];
  if (className) cls.push(className);
  if (isPrompt) cls.push("study-card__prompt");

  const onClickCard = (evt: React.MouseEvent) => {
    if (evt.currentTarget === evt.target) {
      rotateIfHasDefinition();
    }
  };
  const rotateIfHasDefinition = () => definition && setIsPrompt(!isPrompt);

  return (
    <div className={cls.join(" ")} tabIndex={0}>
      <p className="study-card__front" onClick={onClickCard}>
        <BaseButton className="study-card__edit" secondary to={getLocation(ROUTE.addCard)}>
          <EditIcon width={24} height={24} />
        </BaseButton>
        <em>{termUnderStudy}</em>
      </p>

      <p className={"study-card__back"} onClick={onClickCard}>
        <em>{definition}</em>
      </p>
    </div>
  );
}
