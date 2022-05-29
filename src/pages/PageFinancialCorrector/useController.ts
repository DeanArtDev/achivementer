import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { v1 as uuidv1 } from "uuid";
import {
  FinancialPercentCorrection,
  FinancialReport,
  InputFinancialPercentCorrection,
} from "providers/api/FinancialReportProvider/types";
import { UniqID } from "types";
import { PercentEntity, CorrectionPercents } from "./types";
import { isIdEqualReturnLast } from "utils/predicats";
import { guardOneOf } from "utils/typeGuards";
import useLoading from "hooks/useLoading";
import providers from "providers";
import { Month } from "../../consts";

type LocalCorrection = FinancialPercentCorrection | InputFinancialPercentCorrection;

const INCLUDED_VALUES = ["free", "common", "piggyBank"];
const shapeCorrectionList = (financialReport: FinancialReport): CorrectionPercents[] => {
  return financialReport.parts.map((p) => {
    const percentEntities = Object.entries(p).reduce<PercentEntity[]>((acc, [key, percent]) => {
      if (INCLUDED_VALUES.includes(key)) {
        acc.push({
          id: uuidv1(),
          name: key as PercentEntity["name"],
          percentFormIncome: Number(percent),
          // temp
          corrections: [
            { id: uuidv1(), name: "hello", amount: "10000" },
            { id: uuidv1(), name: "hello2", amount: "200000" },
          ],
          partIncome: p.income,
        });
      }

      return acc;
    }, []);

    return {
      id: financialReport.id,
      percentEntities,
    };
  });
};

const updateOrCreateCorrection = async (correction: LocalCorrection): Promise<FinancialPercentCorrection> => {
  if (!guardOneOf<FinancialPercentCorrection>(correction, "id")) {
    return await providers.FinancialReportProvider.createCorrection(correction);
  } else {
    return await providers.FinancialReportProvider.updateCorrection(correction);
  }
};

export default function useController() {
  const { id } = useParams<{ id: UniqID }>();
  const { loading, setLoading } = useLoading();

  const [correctionPercentsList, setCorrectionPercentsList] = useState<CorrectionPercents[]>([]);
  const title = useRef<string>("");
  const monthIncome = useRef<number>(0);

  const createOrUpdatePercentCorrection = async (
    correction: LocalCorrection,
    updatedPercentEntityId?: PercentEntity["id"]
  ): Promise<void> => {
    const updatedCorrection = await updateOrCreateCorrection(correction);

    const updatedCorrectionPercentsList: CorrectionPercents[] = correctionPercentsList.map<CorrectionPercents>(
      ({ id, percentEntities }) => {
        return {
          id,
          percentEntities: percentEntities.map<PercentEntity>((p) => {
            if (p.id !== updatedPercentEntityId) return p;

            const updatedCorrections = !guardOneOf(correction, "id")
              ? p.corrections.concat(updatedCorrection)
              : p.corrections.map<FinancialPercentCorrection>((c) => isIdEqualReturnLast(c.id, c, updatedCorrection));
            return { ...p, corrections: updatedCorrections };
          }),
        };
      }
    );

    setCorrectionPercentsList(updatedCorrectionPercentsList);
    return new Promise((resolve) => resolve());
  };

  const deletePercentCorrection = async (deletedCorrectionId: FinancialPercentCorrection["id"]): Promise<boolean> => {
    const response = await providers.FinancialReportProvider.deleteCorrection(deletedCorrectionId);
    if (!response) return response;

    const updatedCorrectionPercentsList: CorrectionPercents[] = correctionPercentsList.map<CorrectionPercents>(
      ({ id, percentEntities }) => {
        return {
          id,
          percentEntities: percentEntities.map<PercentEntity>((p) => {
            return { ...p, corrections: p.corrections.filter((c) => c.id !== deletedCorrectionId) };
          }),
        };
      }
    );

    setCorrectionPercentsList(updatedCorrectionPercentsList);
    return response;
  };

  useEffectOnce(() => {
    setLoading(true);
    providers.FinancialReportProvider.search({ ids: [id] })
      .then((response) => {
        if (response && response?.parts.length > 0) {
          title.current = Month[response.month];
          monthIncome.current = response.parts.reduce<number>((acc, p) => (acc += p.income), 0);
          setCorrectionPercentsList(shapeCorrectionList(response));
        }
      })
      .finally(() => setLoading(false));
  });

  return {
    loading,
    correctionPercentsList,
    title: title.current,
    monthIncome: monthIncome.current,
    createOrUpdatePercentCorrection,
    deletePercentCorrection,
  };
}
