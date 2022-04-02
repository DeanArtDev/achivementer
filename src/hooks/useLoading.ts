import { useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);
  //todo: это должно быть едино для всех, добавить в контекст
  const [loadingGlobal, setLoadingGlobal] = useState(false);

  return {
    loading,
    loadingGlobal,
    setLoading,
    setLoadingGlobal,
  };
}
