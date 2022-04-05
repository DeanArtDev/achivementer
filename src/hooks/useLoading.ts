import { useContext, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { loadingAction } from "../context/LoadingContext/consts";

export default function useLoading() {
  const [loading, setLoading] = useState(false);
  const [{ loadingGlobal }, dispatch] = useContext(LoadingContext);

  const setLoadingGlobal = (payload: boolean): void => {
    dispatch({ type: loadingAction.SET_GLOBAL_LOADING, payload });
  };

  return {
    loading,
    loadingGlobal,
    setLoading,
    setLoadingGlobal,
  };
}
