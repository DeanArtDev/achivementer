import React, { useEffect, useRef } from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { InputValidationOptions } from "types";
import { ValidatingPartMap } from "../../../../../../types";
import { PartValidateResultMap } from "../../../../types";
import { numericToStringAdapter } from "utils/adapters";
import emitter, { addPayload } from "utils/emitter";
import { GlobalEmit, Regexp } from "consts";
import CustomTag from "components/CustomTag";
import BaseInput from "UI/BaseInput";
import "./style.scss";

type Props = {
  className?: string;
  title: string;
  tagName?: string;
  part: FinancialPart;
  partValidateResultMap: PartValidateResultMap;
  onChangePart: (part: FinancialPart) => void;
  getValidate?: (partValidateMap: ValidatingPartMap) => void;
};

const getPercentsValidationOptions = (forceValue: InputValidationOptions["forceValue"]): InputValidationOptions => ({
  require: true,
  regexp: Regexp.PERCENT,
  forceValue,
});

const PERCENT_LIMIT = 100;
const PERCENT_DEFAULT_VALID = true;

export default function FieldsetPart({
  part,
  title,
  tagName,
  className,
  partValidateResultMap,
  getValidate,
  onChangePart,
}: Props) {
  const cls = ["fieldset-part"];
  if (className) cls.push(className);

  //todo: не верно работает логика после ввода символа он не добавляется визуально но учавствует в расчете в функции
  const originPart = useRef<FinancialPart>(part);
  const totalPercentMoreThanAvailable = (name: keyof FinancialPart, value: string): boolean => {
    originPart.current = { ...originPart.current, [name]: value };
    const total =
      Number(originPart.current.common) + Number(originPart.current.piggyBank) + Number(originPart.current.free);
    return total > PERCENT_LIMIT;
  };

  const handleChangePercent = (name: keyof FinancialPart, value: string): void => {
    if (name !== "income" && totalPercentMoreThanAvailable(name, value)) {
      emitter.emit(
        GlobalEmit.SHOW_NOTIFICATION,
        addPayload({ message: "The percents total of the part should not be more than 100%." })
      );
      return;
    }
    onChangePart({ ...part, [name]: value });
  };

  const partValidateMap = useRef<ValidatingPartMap>({
    income: undefined,
    common: undefined,
    piggyBank: undefined,
    free: undefined,
  });
  const handleInputValidateGet = (
    name: keyof Omit<FinancialPart, "id">,
    validate: (value?: string) => boolean
  ): void => {
    partValidateMap.current[name] = validate;
  };

  useEffect(() => {
    getValidate && getValidate(partValidateMap.current);
  });

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
          inputValidateOptions={{
            require: true,
            regexp: Regexp.NUMERIC,
            forceValue: partValidateResultMap?.["income"] ?? PERCENT_DEFAULT_VALID,
          }}
          onChange={(v) => onChangePart({ ...part, income: Number(v) })}
          getValidate={(cb) => handleInputValidateGet("income", cb)}
        />
      </fieldset>

      <fieldset>
        <legend>Percents &quot;%&quot;:</legend>

        <div className={"fieldset-part__wrapper"}>
          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"common-percent"}
            placeholder={"50"}
            inputValidateOptions={getPercentsValidationOptions(
              partValidateResultMap?.["common"] ?? PERCENT_DEFAULT_VALID
            )}
            value={numericToStringAdapter(part.common)}
            getValidate={(cb) => handleInputValidateGet("common", cb)}
            onChange={(v) => handleChangePercent("common", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"piggy-bank-percent"}
            placeholder={"20"}
            inputValidateOptions={getPercentsValidationOptions(
              partValidateResultMap?.["piggyBank"] ?? PERCENT_DEFAULT_VALID
            )}
            value={numericToStringAdapter(part.piggyBank)}
            getValidate={(cb) => handleInputValidateGet("piggyBank", cb)}
            onChange={(v) => handleChangePercent("piggyBank", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"free-percent"}
            placeholder={"30"}
            inputValidateOptions={getPercentsValidationOptions(
              partValidateResultMap?.["free"] ?? PERCENT_DEFAULT_VALID
            )}
            value={numericToStringAdapter(part.free)}
            getValidate={(cb) => handleInputValidateGet("free", cb)}
            onChange={(v) => handleChangePercent("free", v)}
          />
        </div>
      </fieldset>
    </CustomTag>
  );
}
