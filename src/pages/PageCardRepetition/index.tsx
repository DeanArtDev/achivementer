import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useController from "./controller";
import BasePage from "../../components/BasePage";
import BaseButton from "../../components/BaseButton";
import StudyCardSlider from "../../components/StudyCardSlider";
import BasePreloader from "../../components/BasePreloader/index";
import "./style.scss";

export default function PageCardRepetition() {
  const { cardList, prompt, isLoading, onCurrentSlideChange } = useController();

  const preloaderRef = useRef<HTMLDivElement>(null);

  return (
    <BasePage>
      <section className="card-repetition mx-auto pt-4 pb-4">
        <h1 className="visually-hidden">Repetition of the cards</h1>
        <div className="card-repetition__card-wrapper">
          <CSSTransition
            classNames="show-control"
            in={isLoading}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            nodeRef={preloaderRef}
          >
            <BasePreloader
              className="card-repetition__preloader"
              color={"var(--palette-fg)"}
              size={70}
              preloaderRef={preloaderRef}
            />
          </CSSTransition>
          <StudyCardSlider cardList={cardList} onCurrentSlideChange={onCurrentSlideChange} />
        </div>
        <div className="card-repetition__content">
          <p className={"card-repetition__reminder mb-4" + (prompt ? "" : " card-repetition__reminder-empty")}>
            {prompt ? prompt : "You can specify a prompt for yourself here, it can help you remember if you forgot."}
          </p>
          <BaseButton className="card-repetition__btn mt-auto">Got it!</BaseButton>
          <BaseButton className="card-repetition__btn mt-auto" negative>
            Repeat tomorrow
          </BaseButton>
        </div>
      </section>
    </BasePage>
  );
}
