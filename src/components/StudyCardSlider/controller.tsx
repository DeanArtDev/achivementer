import { useEffect, useRef, useState } from "react";

// Необходимо задавать min-height и min-width для slide элемента
export default function useController(slideList: any[]) {
  const MAX_SLIDE_RANGE = slideList.length - 1;
  const MIN_SLIDE_RANGE = 0;
  const SLIDE_POSITION_RANGE = 2;


  const isInMaxRange = () => currentSlide.current < MAX_SLIDE_RANGE;
  const isInMinRange = () => currentSlide.current !== MIN_SLIDE_RANGE;
  const isSlideOnlyOne = () => slideList.length === 1;
  const isAtStartSlideList = () => currentSlide.current === MAX_SLIDE_RANGE;
  const isAtEndSlideList = () => currentSlide.current === MIN_SLIDE_RANGE;
  const goToNextOrPrevSlide = (isNext: boolean) => setCurrentSlideAndStyle(isNext);


  const currentSlide = useRef(MIN_SLIDE_RANGE);

  const [containerStyles, setContainerStyles] = useState({});
  const [isEmpty, setIsEmpty] = useState(slideList.length === MIN_SLIDE_RANGE);
  const [isNextDisabled, setIsNextDisabled] = useState(isAtStartSlideList() || isSlideOnlyOne());
  const [isPrevDisabled, setIsPrevDisabled] = useState(isAtEndSlideList() || isSlideOnlyOne());


  useEffect(() => {
    setIsEmpty(slideList.length === MIN_SLIDE_RANGE);
    setIsNextDisabled(isAtStartSlideList() || isSlideOnlyOne() || isEmpty);
    setIsPrevDisabled(isAtEndSlideList() || isSlideOnlyOne() || isEmpty);
  }, [containerStyles]);

  const isNearSlide = (slidePosition: number) => {
    return Math.abs(slidePosition - currentSlide.current) < SLIDE_POSITION_RANGE;
  };

  const setCurrentSlideAndStyle = (isNext: boolean) => {
    if (isNext && isInMaxRange()) {
      const s = ++currentSlide.current;
      setContainerStyles({ transform: `translateX(-${s * 100}%)` });
    }

    if (!isNext && isInMinRange()) {
      const s = --currentSlide.current;
      setContainerStyles({ transform: `translateX(-${s * 100}%)` });
    }
  };

  return {
    isEmpty,
    currentSlide: currentSlide.current,
    isPrevDisabled,
    isNextDisabled,
    goToNextOrPrevSlide,
    containerStyles,
    isNearSlide,
  };
}
