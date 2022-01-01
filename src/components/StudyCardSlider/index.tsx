import { ReactComponent as NextIcon } from "../../assets/images/icons/right-arrow.svg";
import { ReactComponent as PrevIcon } from "../../assets/images/icons/left-arrow.svg";

import React from "react";
import { Card } from "../../providers/api/CardProvider/CardProvider";
import StudyCard from "./components/StudyCard";
import BaseButton from "UI/BaseButton/index";
import useController from "./controller";
import "./style.scss";

interface Props {
  cardList: Card[];
  onNextSlideClick?: () => void;
  onPrevSlideClick?: () => void;
  onCurrentSlideChange?: (slideIndex: number) => void;
}

export default function StudyCardSlider({ cardList, onCurrentSlideChange, onNextSlideClick, onPrevSlideClick }: Props) {
  const { isNearSlide, isEmpty, isPrevDisabled, isNextDisabled, containerStyles, goToNextOrPrevSlide } =
    useController(cardList, onCurrentSlideChange);

  const onNextClick = () => {
    goToNextOrPrevSlide(true);
    onNextSlideClick && onNextSlideClick();
  };
  const onPrevClick = () => {
    goToNextOrPrevSlide(false);
    onPrevSlideClick && onPrevSlideClick();
  };

  return (
    <div className="study-card-slider">
      <ul className="study-card-slider__wrapper" style={containerStyles}>
        {isEmpty && <li className="study-card-slider__slide">There are no cards yet.</li>}

        {cardList.map((card, index) => (
          <li className="study-card-slider__slide" key={`slide-${index}`}>
            {isNearSlide(index) && <StudyCard termUnderStudy={card.termUnderStudy} definition={card.definition} />}
          </li>
        ))}
      </ul>

      <div className="study-card-slider__btn-wrapper mt-2 mb-2">
        <BaseButton className="study-card-slider__btn" disabled={isPrevDisabled} secondary onClick={onPrevClick}>
          Go to the prev slide
          <PrevIcon width={24} />
        </BaseButton>
        <BaseButton className="study-card-slider__btn" disabled={isNextDisabled} secondary onClick={onNextClick}>
          Go to the next slide
          <NextIcon width={24} />
        </BaseButton>
      </div>
    </div>
  );
}
