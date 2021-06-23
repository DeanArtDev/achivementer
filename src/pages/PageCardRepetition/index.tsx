import React from "react";
import BasePage from "../../components/BasePage";
import StudyCard from "../../components/StudyCard";
import BaseButton from "../../components/BaseButton";
import "./style.scss";

export default function PageCardRepetition() {
  return (
    <BasePage>
      <section className={"card-repetition mx-auto"}>
        <h1 className={"visually-hidden"}>Repetition of the cards</h1>
        <div className={"card-repetition__card-wrapper"}>
          <StudyCard className={"mx-auto"} />
        </div>
        <div className={"card-repetition__content"}>
          <p className={"card-repetition__reminder mb-4"}>
            ProidentfsdfdsProidentfsdfdsProidentfsdfdsProidentfsdfdsProi.
          </p>
          <BaseButton className={"card-repetition__btn mt-auto"}>
            Got it!
          </BaseButton>
          <BaseButton className={"card-repetition__btn mt-auto"} negative>
            Repeat tomorrow
          </BaseButton>
        </div>
      </section>
    </BasePage>
  );
}
