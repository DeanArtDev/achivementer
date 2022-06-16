import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { v1 as uuidv1 } from "uuid";
import { FinancialReport } from "providers/api/FinancialReportProvider/types";
import { Correction, InputCreateCorrection } from "providers/api/CorrectionProvider/types";
import { UniqID } from "types";
import { PercentEntity, CorrectionPercents, CreateOrUpdateCorrectionData } from "./types";
import { isIdEqualReturnLast } from "utils/predicats";
import { guardOneOf } from "utils/typeGuards";
import useLoading from "hooks/useLoading";
import providers from "providers";
import { Month } from "../../consts";

const INCLUDED_VALUES = ["free", "common", "piggyBank"];
const shapeCorrectionList = (financialReport: FinancialReport): CorrectionPercents[] => {
  return financialReport.parts.map((p) => {
    const percentEntities = Object.entries(p).reduce<PercentEntity[]>((acc, [key, percent]) => {
      if (INCLUDED_VALUES.includes(key)) {
        acc.push({
          id: uuidv1(),
          partId: p.id,
          name: key as PercentEntity["name"],
          percentFormIncome: Number(percent),
          corrections: [],
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

const updateOrCreateCorrection = async (correctionData: CreateOrUpdateCorrectionData): Promise<Correction> => {
  if (guardOneOf<InputCreateCorrection>(correctionData, "financialPartId")) {
    return await providers.CorrectionProvider.create(correctionData);
  } else {
    return await providers.CorrectionProvider.update(correctionData);
  }
};

export default function useController() {
  const { id } = useParams<{ id: UniqID }>();
  const { loading, setLoading } = useLoading();

  const [correctionPercentsList, setCorrectionPercentsList] = useState<CorrectionPercents[]>([]);
  const title = useRef<string>("");
  const monthIncome = useRef<number>(0);

  const createOrUpdatePercentCorrection = async (
    correctionData: CreateOrUpdateCorrectionData,
    updatedPercentEntityId?: PercentEntity["id"]
  ): Promise<void> => {
    const updatedCorrection = await updateOrCreateCorrection(correctionData);
    const isNew = guardOneOf<InputCreateCorrection>(correctionData, "financialPartId");

    const updatedCorrectionPercentsList: CorrectionPercents[] = correctionPercentsList.map<CorrectionPercents>(
      ({ id, percentEntities }) => {
        return {
          id,
          percentEntities: percentEntities.map<PercentEntity>((p) => {
            if (p.id !== updatedPercentEntityId) return p;

            const updatedCorrections = isNew
              ? p.corrections.concat(updatedCorrection)
              : p.corrections.map<Correction>((c) => isIdEqualReturnLast(c.id, c, updatedCorrection));
            return { ...p, corrections: updatedCorrections };
          }),
        };
      }
    );

    setCorrectionPercentsList(updatedCorrectionPercentsList);
    return new Promise((resolve) => resolve());
  };

  const deletePercentCorrection = async (deletedCorrectionId: Correction["id"]): Promise<boolean> => {
    const response = await providers.CorrectionProvider.delete(deletedCorrectionId);
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
