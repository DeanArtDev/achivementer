import React, { FocusEvent, useRef, useState, Children, ReactElement, MouseEvent } from "react";
import { useEffectOnce } from "react-use";
import { ReactComponent as DotsIcon } from "assets/images/icons/dots-vertical.svg";
import { extendReactElementByClassName } from "utils/templateHelpers";
import BaseButton from "../BaseButton";
import "./style.scss";

const TARGET_CLASS_NAME = "base-setting-menu__item";

type Props = {
  className?: string;
};

export default function BaseSettingMenu({ className, children }: Props & { children: ReactElement | ReactElement[] }) {
  const cls = ["base-setting-menu d-flex"];
  if (className) cls.push(className);

  const [isShowMenu, setIsShowMenu] = useState(false);
  const childrenWithClassName = useRef<ReactElement[]>([]);

  const handleMenuBlur = ({ relatedTarget }: FocusEvent<HTMLDivElement, HTMLButtonElement>): void => {
    if (relatedTarget && relatedTarget.className.includes(TARGET_CLASS_NAME)) {
      relatedTarget.click();
    }
    setIsShowMenu(false);
  };

  const handleButtonClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    setIsShowMenu(true);
  };

  useEffectOnce(() => {
    childrenWithClassName.current = Children.map(children, (c) => {
      return extendReactElementByClassName(c, TARGET_CLASS_NAME);
    });
  });

  return (
    <div className={cls.join(" ")} onBlur={handleMenuBlur}>
      <BaseButton className={"base-setting-menu__active-btn pa-0"} icon onClick={handleButtonClick}>
        <DotsIcon height={22} width={22} />
      </BaseButton>

      {isShowMenu && <div className={"base-setting-menu__content"}>{childrenWithClassName.current}</div>}
    </div>
  );
}
