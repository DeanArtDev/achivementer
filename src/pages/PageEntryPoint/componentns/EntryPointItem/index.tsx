import React, {FC} from "react";
import { Link } from "react-router-dom";
import { Location } from "history";
import { LocationState } from "types";
import "./style.scss";

type Props = {
  title: string;
  to: Location<LocationState>;
  IconComponent?: FC,
  className?: string;
};

export default function EntryPointItem({ className, title, IconComponent, to }: Props) {
  const cls = ["entry-point-item pa-4"];
  if (className) cls.push(className);

  return (
    <Link className={cls.join(" ")} to={to}>
      {IconComponent && <IconComponent />}
      <h3 className={"entry-point-item__title"}>{title}</h3>
    </Link>
  );
}
