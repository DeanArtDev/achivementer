import { CSSProperties, useEffect, useRef, useState } from "react";
import { Card } from "../../providers/api/CardProvider/CardProvider";

// Необходимо задавать min-height и min-width для slide элемента
export default function useController(slideList: Card[], onCurrentSlideChange?: (slideIndex: number) => void) {
  const MAX_SLIDE_RANGE = slideList.length - 1;
  const MIN_SLIDE_RANGE = 0;
  const SLIDE_POSITION_RANGE = 2;

  const isInMaxRange = () => currentSlide.current < MAX_SLIDE_RANGE;
  const isInMinRange = () => currentSlide.current !== MIN_SLIDE_RANGE;
  const isSlideOnlyOne = () => slideList.length === 1;
  const isAtStartSlideList = () => currentSlide.current === MAX_SLIDE_RANGE;
  const isAtEndSlideList = () => currentSlide.current === MIN_SLIDE_RANGE;
  const goToNextOrPrevSlide = (isNext: boolean) => setCurrentSlideAndStyle(isNext);

  const currentSlide = useRef<number>(MIN_SLIDE_RANGE);

  const [containerStyles, setContainerStyles] = useState<Partial<CSSProperties>>({ transform: "translateX(0)" });
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(isAtStartSlideList() || isSlideOnlyOne());
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(isAtEndSlideList() || isSlideOnlyOne());

  useEffect(() => {
    setIsEmpty(slideList.length === MIN_SLIDE_RANGE);
  }, [slideList]);
  useEffect(() => {
    setIsNextDisabled(isAtStartSlideList() || isSlideOnlyOne() || isEmpty);
    setIsPrevDisabled(isAtEndSlideList() || isSlideOnlyOne() || isEmpty);
    onCurrentSlideChange && onCurrentSlideChange(currentSlide.current);
  }, [containerStyles, isEmpty]);

  const isNearSlide = (slidePosition: number): boolean => {
    return Math.abs(slidePosition - currentSlide.current) < SLIDE_POSITION_RANGE;
  };

  const setCurrentSlideAndStyle = (isNext: boolean): void => {
    if (isNext && isInMaxRange()) {
      setContainerStyles({ transform: `translateX(-${++currentSlide.current * 100}%)` });
    }

    if (!isNext && isInMinRange()) {
      setContainerStyles({ transform: `translateX(-${--currentSlide.current * 100}%)` });
    }
  };

  return {
    isEmpty,
    isPrevDisabled,
    isNextDisabled,
    isNearSlide,
    containerStyles,
    goToNextOrPrevSlide,
  };
}
