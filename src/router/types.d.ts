import { FC } from "react";
import { routePath } from "./consts";

export type RouterConfigItem = {
  path: routePath;
  exact?: boolean;
  Component: FC;
};
