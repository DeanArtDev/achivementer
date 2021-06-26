import React from "react";
import BasePage from "../../components/BasePage";
import BaseButton from "../../components/BaseButton";
import useController from "./controller";
import StudyCardSlider from "../../components/StudyCardSlider";
import "./style.scss";

export default function PageCardRepetition() {
  const { cardList, prompt, onSlideClick, isLoading } = useController();

  return (
    <BasePage>
      <section className="card-repetition mx-auto pt-4 pb-4">
        <h1 className={"visually-hidden"}>Repetition of the cards</h1>
        <div className={"card-repetition__card-wrapper"}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <StudyCardSlider cardList={cardList} onNextSlideClick={onSlideClick} onPrevSlideClick={onSlideClick} />
          )}
        </div>
        <div className={"card-repetition__content"}>
          <p className={"card-repetition__reminder mb-4" + (prompt ? "" : " card-repetition__reminder-empty")}>
            {prompt ? prompt : "You can specify a prompt for yourself here, it can help you remember if you forgot."}
          </p>
          <BaseButton className={"card-repetition__btn mt-auto"}>Got it!</BaseButton>
          <BaseButton className={"card-repetition__btn mt-auto"} negative>
            Repeat tomorrow
          </BaseButton>
        </div>
      </section>
    </BasePage>
  );
}
