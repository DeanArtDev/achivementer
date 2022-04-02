import { useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  return {
    loading,
    loadingGlobal,
    setLoading,
    setLoadingGlobal,
  };
}
