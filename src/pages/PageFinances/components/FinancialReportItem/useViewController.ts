import { FinancialPercents, FinancialReport } from "providers/api/FinancialRequestProvider/types";
import { ReportPart } from "./types";
import { useState } from "react";
import { Month, Period } from "consts";

type Percentage = Omit<ReportPart, "title">;

const getReportPartAmounts = (percentageOfIncome: Percentage, parts: FinancialReport["period"]["part"]): Percentage => {
  return {
    commonAmount: Number((percentageOfIncome.commonAmount / parts).toFixed(3)),
    piggyBakAmount: Number((percentageOfIncome.piggyBakAmount / parts).toFixed(3)),
    freeAmount: Number((percentageOfIncome.freeAmount / parts).toFixed(3)),
  };
};

const getPercentageOfIncome = (income: number, percents: FinancialPercents): Percentage => {
  return {
    commonAmount: Number(((income / 10) * (percents.common / 10)).toFixed(3)),
    piggyBakAmount: Number(((income / 10) * (percents.piggyBank / 10)).toFixed(3)),
    freeAmount: Number(((income / 10) * (percents.free / 10)).toFixed(3)),
  };
};

export default function useViewController(report: FinancialReport): [string, ReportPart[]] {
  const [percentageOfIncome] = useState<Percentage>({
    ...getPercentageOfIncome(report.income, report.percents),
  });

  const title = `The ${Month[report.period.month]} report`;

  const periods: ReportPart[] = new Array(report.period.part).fill("").map((_, index) => {
    return {
      title: `The ${Period[index]} period`,
      ...getReportPartAmounts(percentageOfIncome, report.period.part),
    };
  });

  return [title, periods];
}
