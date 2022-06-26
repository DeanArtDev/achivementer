import React, { ReactElement, MouseEvent } from "react";
import { useEffectOnce } from "react-use";
import { ReactComponent as DotsIcon } from "assets/images/icons/dots-vertical.svg";
import useToggleComponentVisibility from "hooks/useToggleComponentVisibility";
import BaseButton from "../BaseButton";
import "./style.scss";

type Props = {
  className?: string;
  onToggleShowing?: (cb: () => void) => void;
};

export default function BaseSettingMenu({
  className,
  onToggleShowing,
  children,
}: Props & { children: ReactElement | ReactElement[] }) {
  const cls = ["base-setting-menu d-flex"];
  if (className) cls.push(className);

  const { ref, isVisible, setIsVisible } = useToggleComponentVisibility(false);

  const handleButtonClick = (evt: MouseEvent): void => {
    evt.stopPropagation();
    setIsVisible((state) => !state);
  };

  useEffectOnce(() => {
    const toggleShowing = () => setIsVisible((state) => !state);
    onToggleShowing && onToggleShowing(toggleShowing);
  });

  return (
    <div className={cls.join(" ")} ref={ref}>
      <BaseButton className={"base-setting-menu__active-btn pa-0"} icon onClick={handleButtonClick}>
        <DotsIcon height={22} width={22} />
      </BaseButton>

      {isVisible && <div className={"base-setting-menu__content"}>{children}</div>}
    </div>
  );
}
