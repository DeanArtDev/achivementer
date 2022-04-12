import { routePath } from "router/consts";
import { ReactComponent as FinancialIcon } from "assets/images/icons/finance-icon.svg";
import { FC } from "react";

type EntryPointItem = {
  name: string;
  path: routePath;
  icon?: FC;
  className?: string;
};

const entryPointItems: EntryPointItem[] = [
    { name: "Finances", path: routePath.FINANCES, icon: FinancialIcon },
    { name: "Logout", path: routePath.LOGOUT, className: "page-entry-point__logout" },
];

export default entryPointItems;
