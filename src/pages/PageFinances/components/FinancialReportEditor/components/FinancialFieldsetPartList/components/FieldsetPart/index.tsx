import React, { useRef} from "react";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { InputValidationOptions } from "types";
import { ValidationFieldsMap } from "../../../../../../types";
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
  onChangePart: (part: FinancialPart) => void;
  onValidCheck?: (isValid: boolean) => void;
};

const percentsValidationOptions: InputValidationOptions = {
  regexp: Regexp.PERCENT,
  require: true,
};

const PERCENT_LIMIT = 100;

export default function FieldsetPart({ part, title, tagName, className, onChangePart, onValidCheck }: Props) {
  const cls = ["fieldset-part"];
  if (className) cls.push(className);

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

  const validationFieldsMap = useRef<ValidationFieldsMap>({});
  const handleInputValidCheck = (name: keyof FinancialPart, isValid: boolean): void => {
    validationFieldsMap.current[name] = isValid;
    onValidCheck && onValidCheck(Object.values(validationFieldsMap.current).every(Boolean));
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
          inputValidateOptions={{ regexp: Regexp.NUMERIC, require: true }}
          onChange={(v) => onChangePart({ ...part, income: Number(v) })}
          onValidCheck={(v) => handleInputValidCheck("income", v)}
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
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(part.common)}
            onValidCheck={(v) => handleInputValidCheck("common", v)}
            onChange={(v) => handleChangePercent("common", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"piggy-bank-percent"}
            placeholder={"20"}
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(part.piggyBank)}
            onValidCheck={(v) => handleInputValidCheck("piggyBank", v)}
            onChange={(v) => handleChangePercent("piggyBank", v)}
          />

          <BaseInput
            className={"fieldset-part__input pa-3"}
            name={"free-percent"}
            placeholder={"30"}
            inputValidateOptions={percentsValidationOptions}
            value={numericToStringAdapter(part.free)}
            onValidCheck={(v) => handleInputValidCheck("free", v)}
            onChange={(v) => handleChangePercent("free", v)}
          />
        </div>
      </fieldset>
    </CustomTag>
  );
}
