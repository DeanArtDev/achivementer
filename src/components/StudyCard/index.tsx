import React from "react";
import { useState } from "react";
import "./style.scss";

interface Props {
  className?: string;
}

export default function StudyCard({ className }: Props) {
  const [isPrompt, setIsPrompt] = useState(false);

  const cls = ["study-card"];
  if (className) cls.push(className);
  if (isPrompt) cls.push("study-card__prompt");

  return (
    <button className={cls.join(" ")} tabIndex={0} onClick={() => setIsPrompt(!isPrompt)}>
      {/* <span>{card.memorizingText}</span>
      <span>{card.prompt}</span> */}
      <em className={"study-card__front"}> happineshappineshappineshappines </em>
      <em className={"study-card__back"}> the prompt of happines </em>
    </button>
  );
}
