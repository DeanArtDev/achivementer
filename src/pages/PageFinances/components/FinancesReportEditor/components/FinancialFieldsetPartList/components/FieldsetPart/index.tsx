import React from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { InputValidationOptions, Predicate } from "type";
import { numericToStringAdapter } from "utils/adapters";
import { Regexp } from "consts";
import CustomTag from "components/CustomTag";
import BaseInput from "UI/BaseInput";

import "./style.scss";

type Props = {
  className?: string;
  id: FinancialPart["id"];
  title: string;
  tagName?: string;
  part: FinancialPart;
  onChangePart: (part: FinancialPart) => void;
  setValidationCallback: (predicate: Predicate) => void;
};

const getPercentsValidationOptions = (id: Props["id"]): InputValidationOptions => ({
  predicateNameSpace: id,
  regexp: Regexp.PERCENT,
  require: true,
});

export default function FieldsetPart({
  id,
  part,
  title,
  tagName,
  className,
  onChangePart,
  setValidationCallback,
}: Props) {
  const cls = ["fieldset-part"];
  if (className) cls.push(className);

  const handleChangePercent = (name: keyof FinancialPart, value: string): void => {
    onChangePart({ ...part, [name]: value });
  };

  return (
    <CustomTag className={cls.join(" ")} type={tagName}>
      <h3 className={"fieldset-part__title"}>{title}</h3>
      <fieldset className={"fieldset-income__wrapper mb-3"}>
        <legend>Income:</legend>
        <BaseInput
          className={"fieldset-part__income pa-3"}
          name={"income"}
          placeholder={"20000"}
          value={numericToStringAdapter(part.income)}
          inputValidateOptions={{ predicateNameSpace: id, regexp: Regexp.NUMERIC, require: true }}
          onChange={(v) => onChangePart({ ...part, income: Number(v) })}
          setValidationCallback={setValidationCallback}
        />
      </fieldset>

      <fieldset>
        {/* todo: если после цифры идет буква краснит input*/}
        <legend>Percents &quot;%&quot;:</legend>

        <div className={"fieldset-part__wrapper"}>
          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"common-percent"}
            placeholder={"50"}
            inputValidateOptions={getPercentsValidationOptions(id)}
            value={numericToStringAdapter(part.common)}
            setValidationCallback={setValidationCallback}
            onChange={(v) => handleChangePercent("common", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"piggy-bank-percent"}
            placeholder={"20"}
            inputValidateOptions={getPercentsValidationOptions(id)}
            value={numericToStringAdapter(part.piggyBank)}
            setValidationCallback={setValidationCallback}
            onChange={(v) => handleChangePercent("piggyBank", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"free-percent"}
            placeholder={"30"}
            inputValidateOptions={getPercentsValidationOptions(id)}
            value={numericToStringAdapter(part.free)}
            setValidationCallback={setValidationCallback}
            onChange={(v) => handleChangePercent("free", v)}
          />
        </div>
      </fieldset>
    </CustomTag>
  );
}
