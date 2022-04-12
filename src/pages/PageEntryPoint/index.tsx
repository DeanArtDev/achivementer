import React from "react";
import useRouterHistory from "hooks/useRouterHistory";
import BaseMain from "UI/BaseMain";
import BasePage from "UI/BasePage";
import entryPointItems from "./config";
import EntryPointItem from "./componentns/EntryPointItem";
import "./style.scss";

export default function PageEntryPoint() {
  const { getLocation } = useRouterHistory();

  return (
    <BasePage className={"page-entry-point"}>
      <BaseMain className={"page-entry-point__main container-narrow"}>
        <ul className={"page-entry-point__list"}>
          {entryPointItems.map((i) => (
            <li className={"page-entry-point__item"} key={i.path}>
              <EntryPointItem title={i.name} IconComponent={i.icon} className={i.className} to={getLocation(i.path)} />
            </li>
          ))}
        </ul>
      </BaseMain>
    </BasePage>
  );
}
