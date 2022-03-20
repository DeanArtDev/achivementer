import { FinancialReport } from "providers/api/FinancialReportProvider/types";
import { Month } from "consts";

export default function useViewController(report: FinancialReport): [string, number] {
  const title = `${Month[report.period.month]}`;

  const totalAmount = (): number => {
    if (report.parts.length === 1) {
      return report.parts[0].income;
    }

    return report.parts.reduce<number>((acc, { income }) => {
      acc += income;
      return acc;
    }, 0);
  };

  return [title, totalAmount()];
}
