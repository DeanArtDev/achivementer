import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { FinancialPart } from "providers/api/FinancialReportProvider/types";
import { UniqID } from "types";
import { PercentEntity } from "./types";
import useLoading from "hooks/useLoading";
import providers from "providers";
import { Month } from "../../consts";

const MISSED_VALUES = ["id", "income"];

export default function useController() {
  const { id } = useParams<{ id: UniqID }>();
  const { loading, setLoading } = useLoading();

  const [correctionPartList, setCorrectionPartList] = useState<PercentEntity[][]>([]);
  const title = useRef<string>("");
  const monthIncome = useRef<number>(0);
  const shapeCorrectionList = (parts: FinancialPart[]): PercentEntity[][] => {
    return parts.map((p) => {
      return Object.entries(p).reduce<PercentEntity[]>((acc, [key, percent]) => {
        if (MISSED_VALUES.includes(key)) return acc;

        acc.push({
          name: key as PercentEntity["name"],
          percentFormIncome: Number(percent),
          corrections: [],
          partIncome: p.income,
        });

        return acc;
      }, []);
    });
  };

  useEffectOnce(() => {
    setLoading(true);
    providers.FinancialReportProvider.search({ ids: [id] })
      .then((response) => {
        if (response && response?.parts.length > 0) {
          title.current = Month[response.month];
          monthIncome.current = response.parts.reduce<number>((acc, p) => (acc += p.income), 0);
          setCorrectionPartList(shapeCorrectionList(response.parts));
        }
      })
      .finally(() => setLoading(false));
  });

  return {
    loading,
    correctionPartList,
    title: title.current,
    monthIncome: monthIncome.current,
  };
}
